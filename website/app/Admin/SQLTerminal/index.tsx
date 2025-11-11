"use client";

import { Textarea, Button, Card, Header, ButtonGroup, Icon } from "@/components";
import { useState } from "react";
import {api, Alert} from "@/utils";
import Terminal from "./Terminal";

export default function SqlTerminal(){
    const [SqlStatement, setSqlStatement] = useState<string>("");

const handleSubmit = async (event?: React.FormEvent, data?:string) => {
    if (event) event.preventDefault();
    try{
        const response = await api.post("/admin/sql/execute", {"statement": data ?? SqlStatement}, {withCredentials: true});
        console.log("response.data", response.data);
        if (response.data){
            const jsonString = JSON.stringify(response.data, null, 2);
            const blob = new Blob([jsonString], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
            setTimeout(() => URL.revokeObjectURL(url), 2000);
        }           
        setSqlStatement("");
        Alert({message:"SQL-Statment erfolgreich ausgeführt!", success:true})
    }
    catch(error:any){
        const message = error.response.data.detail;
        Alert({message: message, success:false});
        console.error(error);
    }
}

    return (
    <>
        <Header className="!text-[var(--A-50)]">SQL Terminal</Header>
        <ButtonGroup buttons={{
            "SELECT": ()=>setSqlStatement("SELECT * FROM <->"),
            "INSERT": ()=>setSqlStatement("INSERT INTO <-> (...) VALUES (...)"),
            "UPDATE": ()=>setSqlStatement("UPDATE <-> SET col1=?, col2=?"),
            "DELETE": ()=>setSqlStatement("DELETE FROM <-> WHERE ..."),
        }}/>
        <form onSubmit={handleSubmit} method="POST">
            <Terminal value={SqlStatement} onChange={(e)=> setSqlStatement(e.target.value)} />

            <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                    <Button type="submit">ausführen</Button>
                    <Button onClick={()=>setSqlStatement("")} type="button"><Icon.X fill="#ffffff" width="30px" height="30px"/></Button>
                </div>
                <div className="flex flex-row">
                <Button onClick={()=>{
                    handleSubmit(undefined, "SHOW TABLES");
                }} type="button">
                    Tabellen
                </Button>
                <Button
                  type="button"
                  onClick={() => window.location.href = api.url+"/admin/sql/backup"}
                >
                  Backup
                </Button>

                </div>
            </div>
        </form>
    </>
)}


