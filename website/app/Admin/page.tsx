"use client";

import UserTable from "./UserTable";
import Uni_grades from "./uni_grades";
import SqlTerminal from "./SQLTerminal";
import Resume from "./Resume";
import {Accordion, Card } from "@/components";

export default function Admin() {
  return (
  <div className="pb-10">
    <br /><br />
    <Accordion className="mb-10"  titleClassName="text-[var(--A-500)]" title="Nutzer" open>
        <UserTable />
    </Accordion>


  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 w-full">
    {
      [
        Uni_grades,
        Resume, 
        SqlTerminal
      ]
      .map((Element, idx)=>(
      <Card key={idx}>
        <Element />
      </Card>

    ))
    }
  </div>

    
  </div>
)}