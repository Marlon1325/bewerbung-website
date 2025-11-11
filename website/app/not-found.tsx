

export default function NotFoundPage(){
    return (
        <div className="bg-[var(--A-900)] m-0 w-[100vw] h-[100vh] flex items-center justify-center">
            <h1 className="next-error-h1 inline-block mr-5 pr-6 text-2xl font-medium align-top leading-[49px] text-white">404</h1>
            <div className="inline-block">
                <h2 className="text-sm font-normal leading-[49px] m-0 text-white">Diese Seite wurde nicht gefunden</h2>
            </div>
        </div>
    )
}