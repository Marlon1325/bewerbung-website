"use client";

import React, { useState } from "react"
import { Input, Button, Header, Card, Select, Toggle, Textarea } from "@/components"
import {Alert, api} from "@/utils";
import type { ResumeCategory } from "@/utils/types";

interface FormData_{
    title: string,
    subtitle?:string,
    category: ResumeCategory,
    start: string
    end?: string
}


export default function Resume(){
    const emptyFormData:FormData_ = {title:"", subtitle: undefined, start:"", end:undefined, category:"Schulbildung"}
    const [formData, setFormData] = useState<FormData_>(emptyFormData);
    const [withDay, setWithDay] = useState<boolean>(true);

const handleChange = (e: React.ChangeEvent<any>) => {
      const { name, value } = e.target;
       setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    };


const handleToggleChange = ()=>{
    let newdata = formData;
    (["start", "end"] as (keyof FormData_)[]).forEach((key)=>{
        if (formData[key]) newdata ={
                    ...newdata,
                    // YYYY-MM-DD <-> YYYY-MM
                    [key]: withDay ? formData[key].slice(0,-3) : formData[key]+"-01"
                    }
    })
    setFormData(newdata);
    setWithDay(!withDay);
}

const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try{
        await api.post("/admin/resume", formData, {withCredentials:true});
        Alert({message:"Erfolgreich hinzugefügt", success:true })
    }
    catch(error:any){
        const message = error.response.data.detail;
        Alert({message: message, success:false});
        console.error(error);
    }
    finally{
        setFormData(emptyFormData);
    }
}
    return (
    <>
        <Header className="!text-[var(--A-50)]">Lebenslauf</Header>
        <form onSubmit={handleSubmit} method="POST">
           
           <Toggle checked={withDay} onChange={handleToggleChange} label="Datum mit Tag"/>
            <Input 
                name="start" 
                type={withDay ? "date":"month"} icon="date" 
                onChange={handleChange} 
                label="Beginn"
                value={formData.start ?? ""}
                required
            />
            <Input 
                name="end" 
                type={withDay ? "date":"month"} icon="date" 
                onChange={handleChange}
                label="Ende"
                value={formData.end ?? ""}
            />
            <Select label="Kategorie" name="category" value={formData.category} onChange={handleChange} required>
                <option className="text-[var(--A-50)]" value="Schulbildung">Schulbildung</option>
                <option className="text-[var(--A-50)]" value="Praktika">Praktika</option>
            </Select>
            <Input type="text" value={formData.title ?? "" } onChange={handleChange} name="title" label="Titel" required/>
            <Textarea value={formData.subtitle ?? ""} rows={2} onChange={handleChange} name="subtitle" label="Untertitel"/>

            <Button type="submit">hinzufügen</Button>
        </form>
    </>
)}

