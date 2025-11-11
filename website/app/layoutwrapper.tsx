"use client";
import { usePathname } from "next/navigation";
import ContactSection from "./(contact)";
import { Nav } from "@/components";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import {api} from "@/utils";

const SITES = ["/Anschreiben", "/Lebenslauf", "/Projekt"]

interface Children{
    children: ReactNode
}
function PageMargin({children}: Children){
    return (
    <div className="pt-20 lg:mx-50 md:mx-10 max-sm:mx-3">
        {children}
    </div>
    )
}


const normalizePath = (path: string) => path.endsWith("/") ? path.slice(0,-1) : path;


export default function LayoutWrapper({children}:{children: React.ReactNode}){
    const router = useRouter();
    const pathname= normalizePath(usePathname());
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const isAdminPage = pathname == "/Admin";
    useEffect(()=>{
        async function checkLogin() {
            if (pathname == "") return;
            try{
                const response = await api.get("/currentuser",  {withCredentials: true });
                setIsAdmin(response.data.admin ?? false);
                if (pathname == "/Admin" && !response.data.admin) throw Error("Forbidden");
            }
            catch(error:any){
                router.replace("/")
            }
        }
        checkLogin();
    }, [])

    if (isAdminPage || SITES.includes(pathname)) return (
        <>   
              <Nav 
                    title={"Bewerbung Marlon Eulberg" + ((isAdminPage || isAdmin) ? " - Admin" : "")}
                    href={(isAdminPage || isAdmin) ? "/Admin" : "/Anschreiben"}
              >
              <Nav.Link title="Anschreiben" href="/Anschreiben" />
              <Nav.Link title="Lebenslauf" href="/Lebenslauf" />
              <Nav.Link title="Projekt" href="/Projekt"/>
              {/* <Nav.Dropdown title="Projekt">
                  <Nav.Dropdown.Link title="Spracherkennung" href="/Projekte/Spracherkennung" />
              </Nav.Dropdown> */}
              <Nav.Link title="Kontakt" href="#Kontakt" />
              <Nav.Logout title="abmelden"/>
          </Nav>
              <PageMargin>{children}</PageMargin>
            <ContactSection />
    </>
    )
    else return <>{children}</> 
}