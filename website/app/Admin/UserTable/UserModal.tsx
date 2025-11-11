import { useState, useEffect } from "react";
import { Button, Modal, Toggle, Textarea, Input } from "@/components";
import { Alert } from "@/utils";
import { Coverletter } from "@/utils/types";


interface ModalProps {
  id: number,
  name: string,
  password?: string | null,
  coverletter?: Coverletter
}

export type { ModalProps };

interface UserModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: ModalProps;
  submit: (data: ModalProps) => Promise<any>;
  buttonLabel: string;
}


const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  setIsOpen,
  submit,
  buttonLabel,
  data,
}) => {


  const defaultData = {
    id : -1,
    name: "",
    coverletter: {title: "", subject: "", text:""},
    admin: false,
  };

  const [formData, setFormData] = useState<ModalProps>(data || defaultData);

  // Immer das Formular neu initialisieren, wenn Modal geöffnet wird oder Daten sich ändern
  useEffect(() => {
    if (isOpen) {
      setFormData(data || defaultData);
    }
  }, [isOpen, data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    const { name, value } = e.target;

    setFormData(prev => {
      if(name.startsWith("coverletter")){
        const coverletter: Coverletter = prev.coverletter ?? defaultData.coverletter;
        const key = name.split("_")[1] as keyof Coverletter;
        if (coverletter)  coverletter[key] = value;
        return  {...prev, coverletter};
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    console.log(formData);
    event.preventDefault();
    try {
      await submit(formData);
    } 
    catch (error: any) {
      const message = error.response.data.detail;
      Alert({message: message, success:false});
      console.error(error);
    } 
    finally {
      setIsOpen(false);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            label="Name"
            placeholder="neuer Nutzer"
            required
          />
          <Input
            type="text"
            name="password"
            onChange={handleChange}
            value={formData.password ?? ""}
            label="Passwort"
            placeholder="•••••••••"
            required={!Boolean(data)}
          />
        </div>


          <div>
            <h2 className="text-2xl mb-2">Coverletter</h2>
            <Input 
              type="text" 
              label="Titel" 
              name="coverletter_title"
              value={formData.coverletter?.title}
              onChange={handleChange}
            />
            <Input 
              type="text"
              label="Betreff"
              name="coverletter_subject"
              value={formData.coverletter?.subject}
              onChange={handleChange}
            />
            <Textarea
              label="Text"
              name="coverletter_text"
              value={formData.coverletter?.text}
              onChange={handleChange}
              rows={8}
            />
          </div>
        
        <Button type="submit">{buttonLabel}</Button>
      </form>
    </Modal>
  );
};

export default UserModal;
