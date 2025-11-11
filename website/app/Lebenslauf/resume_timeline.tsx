import { useState, useEffect } from "react";
import {api} from "@/utils";
import type { ResumeCategory } from "@/utils/types";
import { Timeline, Header } from "@/components";
import { useRouter } from 'next/navigation'

interface Section_Data{
    category: ResumeCategory,
    list: {
        start:string,
        end?: string,
        title: string,
        subtitle: string | null
    
    }[]
}


function Resume_TimeLine(){
    const router = useRouter();
    const [entries, setEntries] = useState<Section_Data[]>([]);
    useEffect(()=>{

        async function setData(){
            const key = "bewerbung-resume";
            const data = sessionStorage.getItem(key);
            if (data) setEntries(JSON.parse(data));
            else{
                try{
                    const response = await api.get("/resume", {withCredentials: true });
                    setEntries(response.data);
                    sessionStorage.setItem(key, JSON.stringify(response.data));
                }
                catch(error:any){
                    console.error(error);
                }
            } 


        }
        setData();
    }, [])

    return (
        <div className="flex flex-col md:flex-row justify-around">
            {
                entries.map(
                    (item, index)=>  (
                    <section key={index}>
                        <Header as="h4" className="!text-[var(--A-50)] !mb-0">{item.category}</Header>
                        <Timeline>  
                        {
                        item.list.map((item, index)=> (
                                <Timeline.Entry 
                                        key={index}
                                        title={item.title} 
                                        subtitle={item.subtitle} 
                                        date={<TimeSpan start={item.start} end={item.end}/>} 
                                />
                            ))}
                        </Timeline>
                    </section>
                    )
                )

            }
        </div>
    )

}


interface TimeSpanProps{
    start: string,
    end?: string
}

function TimeSpan({start, end}: TimeSpanProps){
    const formatDate = (date: string) =>{
        const x = date.split("-");
        x.reverse();
        return x.join("."); 
    }

    if (end) 
        return <>{formatDate(start)} {(end) ? "  -  " + formatDate(end): ""}</>
    else 
        return <>seit {formatDate(start)}</>
}

export default Resume_TimeLine;