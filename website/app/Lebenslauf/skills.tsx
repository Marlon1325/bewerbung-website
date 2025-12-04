import { useState, useEffect } from "react";
import { api } from "@/utils";
import { Card, Accordion } from "@/components";


export default function Skills(){
    const [data, setData] = useState<any[][]>([]);
    useEffect(()=>{
        async function getData(){
            const key = "skills";
            const data = sessionStorage.getItem(key);
            if (data) setData(JSON.parse(data));
            else try{
                const response = await api.get("/resume/skills", {withCredentials: true });
                setData(response.data);
                sessionStorage.setItem(key, JSON.stringify(response.data));
            }
            catch(error:any){
                console.error(error); 
            }
        }
        getData();
    }, [])
    return(
        <div className="text-white grid md:grid-cols-[1fr_1fr_40%] grid-cols-1 gap-4 w-full">
            {
                data.map((value, idx)=>(
                    <SkillEntry key={idx} name={value[0]} value={value[1]} />
                ))
            }
        </div>
    )
}



function SkillEntry({name, value}:{name:string, value:any}){
    const [showValue, setShowValue] = useState<boolean>(false);
    function renderValue(value:any){
        let jsx;
        if (name == "Projekte") jsx= (
            value.map((v:any,idx:number)=>(
            <div key={idx} className="mb-4">
                {v["title"]}
                <ul className="list-disc pl-6">
                    {v["key points"].map((v2:string, idx2:number)=>(
                        <li key={idx2}>{v2}</li>
                    ))}
                </ul>
            </div>
            ))
        )
        
        else if (Array.isArray(value)) jsx= (
            <ul className="list-disc pl-6">
                {value.map((v,idx) =>(
                    <li key={idx}>{v}</li>
                ))}
            </ul>
        );
        else jsx = value;
        return <div className="text-md">{jsx}</div>
    }
    return (
    <Card 
    className={"!bg-[var(--A-700)] cursor-pointer hover:!bg-[var(--A-600)]" + (showValue ? "" : "items-center justify-center")}
    onClick={()=>setShowValue(prev => !prev)}
    >
    <Accordion title={<h5 className="text-lg">{name}</h5>} open={false} lineColor={null} titleClassName="text-white">

        {renderValue(value) }
    </Accordion>
    </Card>
    )
    
}