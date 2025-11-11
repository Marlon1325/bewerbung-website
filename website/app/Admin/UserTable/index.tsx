"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Table, Icon } from "@/components";
import UserModal, { ModalProps as APIData } from "./UserModal";
import {Alert, api} from "@/utils";



export default function UserTable() {
  const router = useRouter();
  const [userData, setUserData] = useState<APIData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUserData, setCurrentUserData] = useState<APIData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/admin/user", { withCredentials: true });
        setUserData(response.data);
      } catch {
      }
    }
    fetchData();
  }, [router]);

  const openModalForEdit = (data: APIData) => {
    setCurrentUserData(data);
    setIsModalOpen(true);
  };

  const openModalForNew = () => {
    setCurrentUserData(null);
    setIsModalOpen(true);
  };

  const deleteUser = async (id: number) => {
    try {
      await api.delete("/admin/deleteuser", { params: { id }, withCredentials: true });
      const data = userData.filter((x)=>(x.id != id));
      setUserData(data);
      Alert({message: "Nutzer gelöscht", success:true});
    } catch (error:any) {
        console.error(error);
        const message = error.response.data.detail;
        Alert({message: message, success:false})
    }
  };

const handleSubmit = async (data: APIData) => {
  try {
    if (currentUserData) {
      // Update existing user
      await api.put("/admin/updateuser", data, { withCredentials: true });
      Alert({message:"Nutzer aktualisiert", success:true});
    }
    else {
      // Add new user
      const {id, ...NewUserData} = data;
      console.log(NewUserData);

      await api.post("/admin/newuser", NewUserData, { withCredentials: true });  
      Alert({message:"Nutzer hinzugefügt", success:true});    
    }
    const response = await api.get("/admin/user",  { withCredentials: true });
    setUserData(response.data);
  } 
  catch (error:any) {
      const message = error.response.data.detail;
      Alert({message: message, success:false});
      console.error(error);
  } 
  finally {
    setIsModalOpen(false);
    setCurrentUserData(null);
  }
};

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table>
          <Table.Head>
            <Table.HEntry>name</Table.HEntry>
            <Table.HEntry>löschen</Table.HEntry>
            <Table.HEntry className="text-right">
              <span
                onClick={openModalForNew}
                className="cursor-pointer font-medium text-2xl text-[var(--B-500)] hover:text-[var(--A-50)]"
              >
                +
              </span>
            </Table.HEntry>
          </Table.Head>
          <Table.Body>
            {userData.map((user, idx) => (
              <Table.Row key={idx}>
                <Table.Entry>{user.name}</Table.Entry>
                <Table.Entry>
                  <Icon.X fill="#ff0000" className="cursor-pointer" onClick={() => deleteUser(user.id)} width="30px" height="30px" />
                </Table.Entry>
                <Table.Entry className="text-right">
                  <div onClick={() => openModalForEdit(user)} className="cursor-pointer font-medium text-[var(--B-500)] hover:underline">
                    bearbeiten
                  </div>
                </Table.Entry>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <UserModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        data={currentUserData || undefined}
        submit={handleSubmit}
        buttonLabel={currentUserData ? "aktualisieren" : "hinzufügen"}
      />
    </div>
  );
}
