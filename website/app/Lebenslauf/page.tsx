"use client";

import Uni_grades from "./uni-grades";
import Resume_Timeline from "./resume_timeline";
import Skills from "./skills";
import { Header, Card } from "@/components";

export default function Lebenslauf(){
    return (
    <div>
      <Card>
        <Header className="!text-[var(--A-50)]">Lebenslauf</Header>
        <Resume_Timeline />
      </Card>

      <br />
      <Card>
        <Header className="!text-[var(--A-50)]">Uni Leistungen</Header>
        <Uni_grades />
      </Card>
      <br />
      <Card>
        <Header className="!text-[var(--A-50)]">Kenntnisse</Header>
        <Skills />
      </Card>
    </div>
    )
}




