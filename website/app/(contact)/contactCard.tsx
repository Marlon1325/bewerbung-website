import { useState, useEffect } from "react";
import { Icon, Card } from "@/components";
import {api} from "@/utils";

interface ContactData{
    phone: string,
    email: string,
    GitHub: string
}

export default function ContactCard(){
    const [data, setData] = useState<ContactData | null>(null);

    useEffect(()=>{
        async function fetchData() {
            const key = "contact";
            const data = sessionStorage.getItem(key);
            if (data) setData(JSON.parse(data));
            else try{
                const response = await api.get("/contact", {withCredentials:true});
                setData(response.data);
                sessionStorage.setItem(key, JSON.stringify(response.data));
            }
            catch(error:any){

            }
        }
        fetchData();
    }, [])
    if (data) return (
    <Card>
        <h2 className="text-3xl my-2.5 text-[var(--A-50)]">Kontakt</h2>
        <div className="mt-5 md:mt-10 flex flex-col justify-center">
          <KontaktLink
            type="phone"
            content={`${data.phone}`}
            link={`tel:${data.phone.replaceAll(" ", "")}`}
          />
          <KontaktLink
            type="email"
            content={`${data.email}`}
            link={`mailto:${data.email}`}
          />
          <KontaktLink type="GitHub" content="GitHub" link={data.GitHub} />
        </div>
    </Card>
    )
    else return null;
}



interface KontaktLinkArgs{
  type: string;
  link: string;
  content: string;
}

function KontaktLink ({type, link, content}:KontaktLinkArgs){
  return(
  <div className="relative py-2.5">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <Icon type={type} width={16} height={16}/>
      </div>
      <a href={link} id="email-address-icon" className=" text-[var(--A-50)] md:hover:text-[var(--B-700)] text-base block w-full ps-10 px-2.5" >
        {content}
      </a>
  </div>
  )
}