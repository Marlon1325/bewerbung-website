



const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({children, className="", ...props})=>{
    return (
        <a className={className+" font-medium text-[var(--B-500)] hover:underline"}
            {...props}
        >
            {children}
        </a>
    )
}

export default Link;