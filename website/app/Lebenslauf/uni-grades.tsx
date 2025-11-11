import { Table, Popover} from "@/components";
import {api} from "@/utils";
import type {Grade, Semester} from "@/utils/types";
import React, {useState, useEffect} from "react";
import { useRouter } from 'next/navigation'


interface datainterface{
        semester: Semester
        list: {
          subject: string
          grade: Grade
          passed: Boolean  
      }[]
  }


const Uni_grades: React.FC = ()=>{
  const router = useRouter();
  const [data, setData] = useState<datainterface[]>([]);

  useEffect(()=>{

      async function fetchData(){
          const key = "bewerbung-uni-grades";
          const data = sessionStorage.getItem(key);

          if (data) setData(JSON.parse(data));
          else {
            try{
              const response = await api.get("/resume/uni-grades",  {withCredentials: true });
              setData(response.data);
              sessionStorage.setItem(key, JSON.stringify(response.data));
          }
          catch(error:any){
            console.error(error);
          }
        }
      }
      fetchData();
  }, [])
    const [activeTab, setActiveTab] = useState(1);

    return (
    <>
    <ul className="flex flex-wrap -mb-px">
        {
    
             data.map((value, index)=> (
              <li className="me-2" key={index}>
                {value.list.length > 0 ? 
                  <div 
                        onClick={()=>setActiveTab(value.semester)}
                        className={(activeTab == value.semester) ? "cursor-pointer inline-block p-4 border-b-2 border-[var(--B-500)] rounded-t-lg active text-[var(--B-500)]" : "text-[var(--A-50)] cursor-pointer inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-[var(--B-500)] hover:text-[var(--B-500)]"}
                  >
                        Sem. {value.semester}
                  </div>
                    :
                <div className={"cursor-not-allowed inline-block p-4 border-b-2 border-transparent rounded-t-lg text-[var(--A-400)] border-[var(--A-700)]"}> Sem. {value.semester} </div>
                }
              </li>    
          )
        )
        }
        
    </ul>
    <br/>
<div>
  <Table>
    <Table.Head>
      <Table.HEntry className="w-3/5">Fach</Table.HEntry>
      <Table.HEntry className="!normal-case"> <GradeRange_Popover/> {/* Note */}</Table.HEntry>
      <Table.HEntry className="!normal-case"> <Passed_Popover /> {/*Bestanden*/}</Table.HEntry>
    </Table.Head>
    <Table.Body>
      {
          data
            .find((x) => x.semester === activeTab)
            ?.list.map((value, index) => (
              <Table.Row key={index}>
                  <Table.Entry>{value.subject}</Table.Entry>
                  <Table.Entry>{String(value.grade)}</Table.Entry>
                  <Table.Entry >{value.passed ? "Ja" : "Nein"} </Table.Entry>
              </Table.Row>
            ))
      }
    </Table.Body>
  </Table>
</div>
</>
)}


export default Uni_grades;



function GradeRange_Popover(){
  const notenSystem: [string, Grade[]][] = [
    ["sehr gut", [15,14,13]],
    ["gut", [12,11,10]],
    ["befriedigend", [9, 8, 7]],
    ["ausreichend", [6, 5, 4]],
    ["mangelhaft", [3, 2, 1]],
    ["ungenügend", [0]]
];

  return (<>
  <Popover trigger={
    <div className="uppercase break-words">Punkte</div>
  } title="Notensystem" placement="top" triggerType="hover">
<div className="flex flex-col w-48">
  {
    notenSystem.map((value, idx)=>(
      <div key={idx} className="flex flex-row text-[var(--A-200)]">
        <div className="w-30">{value[0]} </div>
        <div>{value[1].join(", ")}</div>
      </div>
    ))
  }
</div>
  </Popover>
    </>)
}


function Passed_Popover(){
  const trigger = "Bestanden";
  const content = "Bestanden wenn die Note > 4 Punkte ist";
  const title = "Notensystem";
  return  ( 
  <>
  <div className="block sm:hidden">
      <Popover trigger={
       <div className="uppercase break-words">{trigger}</div>
     } title={title} placement="left" triggerType="hover">
       <div className="text-[var(--A-200)] w-40">{content}</div>
     </Popover>
  </div>
  <div className="hidden sm:block">
      <Popover trigger={
       <div className="uppercase break-words">{trigger}</div>
     } title={title} placement="top" triggerType="hover">
       <div className="text-[var(--A-200)] w-40">{content}</div>
     </Popover>
  </div>

  </>



)
}