"use client";

import {Alert, api} from "@/utils";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { Button, Input, Card } from "@/components";
import LogInJumbotron from "@/components/Jumbotron";
import { usePathname } from "next/navigation";

interface LoginData {
    name: string;
    password: string;
}

interface Error_interface{
    name?:boolean, password?:string
}

export default function LoginPage() {
    const router = useRouter()
    const [Error, setError] = useState<Error_interface>({})
    const [loginData, setLoginData] = useState<LoginData>({
        name: "",
        password: ""
    });

async function login(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault(); // verhindert Seitenreload
  try {
    const response = await api.post("/login", loginData, { withCredentials: true });
    if (response) {
      const url = (response.data.admin) ? "/Admin" : "/Anschreiben";
      router.replace(url);
    }
  } catch (error: any) {
    console.error("Login fehlgeschlagen:", error);
    const status = error?.response?.status;

    if (status) {
      if (status === 401) {
        setError({ name: true, password: "Benutzername oder Passwort ist falsch!" });
      } 
      else if (String(status).startsWith("5")) {
        Alert({ message: "Server-Fehler", success: false });
      } 
      else {
        Alert({ message: `Fehler ${status}`, success: false });
      }
    } 
    else {}
  }
}



const handleChange = (e:any) => {
    const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }));
        setError({});
};


// logout
useEffect(()=>{
    async function Logout() {
      try{
        await api.get("/logout",  {withCredentials: true });
        console.log("logged out successfully")
      }
      finally{
        sessionStorage.clear();
      }
    }
    Logout();
}, [])



    return (
        <LogInJumbotron Title={["Bewerbungs-Website", "Marlon Eulberg"]}>
            <Card>
              <h2 className="text-2xl font-bold text-[var(--A-50)]">Anmeldung</h2>
                <form className="mt-8 space-y-6" onSubmit={login}>
                  <div>
                    <Input
                      type="text"
                      name="name"
                      label="Ihr Nutzername"
                      value={loginData.name}
                      onChange={handleChange}
                      required
                      error={Error.name}
                    />
                  </div>
                  <div>
                    <Input 
                        type="password"
                        name="password"
                        label="Ihr Passwort"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                        error={Error.password}
                    />
                  </div>
                    <Button type="submit">Anmelden</Button>
                </form>
            </Card>    
        </LogInJumbotron>
    );
}
