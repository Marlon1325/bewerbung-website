"use client";

import { Paragraph as P, Card } from "@/components";
import { useEffect, useState } from "react";
import { Coverletter } from "@/utils/types";
import api from "@/utils/api";

export default function Root(){
    const [data, setData] = useState<Coverletter | null>(null);
    useEffect(()=>{
        async function fetchData() {
            const key = "coverletter";
            const data = sessionStorage.getItem(key);
            if (data) setData(JSON.parse(data));
            else try{
                const response = await api.get("/coverletter", {withCredentials: true });
                setData(response.data);
                sessionStorage.setItem(key, JSON.stringify(response.data));
            }
            catch(error:any){
            }
        }
        fetchData();
    }, [])
    return (
        <div>
        <div className="flex flex-col-reverse md:flex-row">
            <Card className="sm:!w-[60%] sm:!p-0 !p-0">
                <Profilpicture />
            </Card>
            <div className="w-10 h-5"></div>
            <Card className="flex justify-center items-center flex-col py-20 md:py-0 w-full">
                <h1 className="mb-4 text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-white text-center">
                    Bewerbung
                </h1>                
                <div className="mb-8 text-2xl md:text-3xl text-white sm:px-16 text-center flex flex-col">
                    {
                        data && data.title.split("\n").map((value, idx)=>(
                            <span key={idx}>{value}</span>
                        ))
                    }
                </div>
            </Card>
        </div>

        <br />
  {data && ( <Card>  
        
          <P className="!font-bold !text-gray-200">
            {data.subject} 
          </P>
          {
            data.text.split("\n").map((value, idx)=>(
                <P className="!text-gray-200" key={idx}>{value}</P>
            ))

        
          }
          {
            (data.text && data.subject) ? (
            <>
                <br/>
                <P className="!text-gray-200">Mit freundlichen Grüßen</P>
                <Signature />
                <P className="!text-gray-200">Marlon Eulberg</P>

           </>
            ): <></>
          }
    </Card>
    )}
</div>
    )
  }


const Signature = () => <img className="h-20" src={`${api.url}/images/signature`}/>
const Profilpicture = () => <img className="h-auto w-full object-contain  rounded-lg" src={`${api.url}/images/profilpicture`} alt="Bild"></img>