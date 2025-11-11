import { ReactNode } from "react"

interface LogInJumbotron_props {
    children?: ReactNode,
    Title: string[] | string
}

const LogInJumbotron:React.FC<LogInJumbotron_props> = ({children, Title, ...props}) =>{
    const titles = (typeof Title === "string") ? [Title] : Title;
    return (
        <section className="bg-[var(--A-900)] w-[100vw] h-[100vh] flex justify-center">
            <div className="py-8 px-4 mx-auto my-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="flex flex-col justify-center">
                    {
                        titles.map((value,idx)=>(
                        <h1 key={idx} className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-[var(--A-50)]">
                            {value}
                        </h1>
                        ))
                    }
                    {/* <p className="mb-6 text-lg font-normal lg:text-xl text-[var(--A-400)]">Hier kann noch was Schlaues hingeschrieben werden</p> */}
                </div>
                <div>
                    {children}
                </div>
            </div>
        </section>
)}
export default LogInJumbotron