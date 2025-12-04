
"use client";
import {api} from "@/utils";
import React, { useState, useEffect } from "react";
import language_flags from "./language_flags";
import LangWithFlag from "./LangWithFlag";
import Form from "./form";
import {Accordion, Card, Link, Paragraph} from "@/components";

export default function Spracherkennung_Site(){
  const [GitHubLink, setGitHubLink] = useState<string | null>(null);

    useEffect(()=>{
        async function fetchData() {
            const key = "contact";
            const data = sessionStorage.getItem(key);
            if (data) setGitHubLink(JSON.parse(data).GitHub);
            else try{
                const response = await api.get("/contact", {withCredentials:true});
                setGitHubLink(response.data.GitHub);
                sessionStorage.setItem(key, JSON.stringify(response.data));
            }
            catch(error:any){

            }
        }
        fetchData();
    }, [])
    return (
        <div>
        <Card><Accordion title="Info" titleClassName="text-[var(--A-50)]" open>
          <Paragraph className="!text-[var(--A-50)]">
              Dies ist ein PyTorch-Projekt, das eingegebenen Text einer der vorgegebenen Sprachen zuordnet. 
              Die Grundlagen des maschinellen Lernens habe ich mir eigenständig angeeignet und vertiefe sie 
              aktuell weiter im Fach "Künstliche Intelligenz I". 
              Den Quellcode sowie die verwendeten Trainingsdaten finden Sie auf&nbsp;
              {
                GitHubLink ?
                <Link href={`${GitHubLink}/language-classification`} target="_blank">Github</Link>
                :
                "Github"
              }.
          </Paragraph>
        </Accordion></Card>
        <br />
        <Card><Accordion title="Welche Sprachen werden erkannt?" titleClassName="text-[var(--A-50)]" open>
          <div className="mb-2 text-[var(--A-400)] flex flex-col gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.keys(language_flags).map((lang, index) => (
              <LangWithFlag language={lang} svg_width={16} key={index}/>
            ))}
          </div>
        </Accordion></Card>
        <br className="pt-2" />
        <Form />



        </div>
        
    )
}














