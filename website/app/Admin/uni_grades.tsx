"use client";

import { useState } from "react"
import { Input, Button, Header } from "@/components"
import {api, Alert} from "@/utils";
import type { Grade,Semester } from "@/utils/types";

interface FormData_{
    semester?: Semester,
    subject?:string,
    grade?:Grade
}


export default function Uni_grades(){

    const [formData, setFormData] = useState<FormData_>({});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type == "number" ? Number(value) : value,
      }))
    };

const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try{
        await api.post("/admin/uni-grades", formData, {withCredentials:true});
        Alert({message:"Erfolgreich hinzugefügt", success:true })
    }
    catch(error:any){
        const message = error.response.data.detail;
        Alert({message: message, success:false});
        console.error(error);
    }
    finally{
        console.log(formData);
        setFormData({});
    }
}
    return (<>
        <Header className="!text-[var(--A-50)]">Uni Leistungen</Header>
        <form onSubmit={handleSubmit} method="POST">
            <Input type="number" value={formData.semester ?? ""} onChange={handleChange} name="semester" label="Semester" required min="1" max="6"/>
            <Input type="text" value={formData.subject ?? "" } onChange={handleChange} name="subject" label="Fach" required/>
            <Input type="number" value={formData.grade} onChange={handleChange} name="grade" label="Note" required min="0" max="15"/>

            <Button type="submit">hinzufügen</Button>
        </form>
    </>
)}