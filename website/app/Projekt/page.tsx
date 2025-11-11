
"use client";

import React from "react";
import language_flags from "./language_flags";
import LangWithFlag from "./LangWithFlag";
import Form from "./form";
import {Accordion, Card, Link, Paragraph} from "@/components";

export default function Spracherkennung_Site(){

    return (
        <div>
        <Card><Accordion title="Info" titleClassName="text-[var(--A-50)]" open>
          <Paragraph className="!text-[var(--A-50)]">
              Dies ist ein PyTorch-Projekt, das eingegebenen Text einer der vorgegebenen Sprachen zuordnet. 
              Die Grundlagen des maschinellen Lernens habe ich mir eigenständig angeeignet und vertiefe sie 
              aktuell weiter im Fach "Künstliche Intelligenz I". 
              Den Quellcode sowie die verwendeten Trainingsdaten finden Sie auf&nbsp;
              <Link href="https://github.com/Marlon1325/language-classification" target="_blank">Github</Link>.
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














