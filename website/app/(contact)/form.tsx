"use client";

import { useState } from "react";
import {api, Alert} from "@/utils";
import {Button, Textarea, Input} from "@/components";



export default function Form(){
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
    });
  
const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const data = formData;
      setFormData({ name: "", email: "", message: "" }); // Setzt das Formular zurück
     
      try {
          await api.post("/sendemail", data,  {withCredentials: true });
          Alert({message:"E-Mails gesendet", success:true, top:false});
      } 
      catch (error: any) {
        Alert({message:"Fehler beim Senden", success:false, top:false});
      }
};
  
    return (
      <form method="post" onSubmit={handleSubmit}>
        <div className="grid gap-3 mb-6 md:mb-0">
          <Input
            value={formData.name}
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Name"
            icon="name"
          />
          {/* <br /> */}
          <Input
            value={formData.email}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email Adresse"
            icon="email"
          />
  
          <div>

            <Textarea
              value={formData.message}
              onChange={handleChange}
              id="message"
              name="message"
              placeholder="Antworten sie mir gerne!"
              rows={4}
              >
        
            </Textarea>
          </div>
  
          <Button type="submit" className="w-30">
            <svg
              className="mr-2 rotate-90 w-4 h-4 text-[var(--A-50)]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z"
              />
            </svg>
            Senden
          </Button>
        </div>
  

      </form>
    );
}


