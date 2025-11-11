

import React, { useState } from "react"
import {api} from "@/utils";
import Result from "./result";
import {Button, Textarea, Card} from "@/components";

interface prediction_data{
    probabilities: {
      language: string[],
      probability: number[]
    },
    prediction: string,
    plot: string  // base64
}


export default function Form() {
  const [text, setText] = useState("");
  const [submittedText, setSubmittedText] = useState("");

  const [ApiData, setApiData] = useState<prediction_data | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  };

  async function  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await api.post("/language_prediction", {"text":text},  {withCredentials: true });
    if (response) setApiData(response.data);
    setSubmittedText(text);
    setText(""); // Textarea leeren

  };

  return (
   <div>
<Card>
     <h2 className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-[var(--A-50)] border-b border-[var(--A-700)] gap-3" >
        Schreibe eine Nachricht, das neuronale Netz erkennt die Sprache   
      </h2>
            
     <form className="max-w-xl w-full" onSubmit={handleSubmit}>
      <Textarea
        required
        rows={8}
        value={text}
        onChange={handleChange}
        className="mt-5"
      ></Textarea>

      <Button type="submit">
        Senden
      </Button>
    </form>
</Card>
    {ApiData && <Result 
                    text={submittedText}
                    language={ApiData.prediction} 
                    plot_data={ApiData.plot} 
                    data={ApiData.probabilities}
                />}
   </div>
  );
}