"use client";
import Form from "./form";
import ContactCard from "./contactCard";
export default function ContactSection() {
  return (
<div
  id="Kontakt"
  // className="mt-15 bg-[var(--A-900)] py-10 px-4 md:px-10 lg:px-20 xl:px-40 w-full"
  className="mt-15 bg-[var(--A-900)] py-10 px-4 md:px-0 lg:px-20 xl:px-40 w-full"

>
  <div className="mx-auto flex flex-col md:flex-row md:gap-x-20 xl:gap-x-32 justify-center max-w-screen-xl">
    {/* Formular */}
    <div className="w-full md:w-2/5 xl:w-1/3 max-w-md">
      <Form />
    </div>

    {/* Kontaktkarte */}
    <div className="mt-8 md:mt-0 w-full md:w-2/5 xl:w-1/3 max-w-md">
      <ContactCard />
    </div>
  </div>
</div>


  )
}


