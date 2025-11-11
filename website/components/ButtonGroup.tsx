

interface ButtonGroupProps{
    buttons: Record<string, Function>
}

const ButtonGroup:React.FC<ButtonGroupProps> = ({buttons})=>{
    return(
<div className="inline-flex rounded-md shadow-xs" role="group">
  {
    Object.keys(buttons).map((value, idx)=>{
        let roundingClass = "";
        if (idx == 0) roundingClass = "rounded-s-lg";
        else if (idx == Object.keys(buttons).length -1) roundingClass = "rounded-e-lg"; 
        return(  
        <button 
            key={idx}
            type="button" 
            className={roundingClass+" px-4 py-2 text-sm font-medium border focus:z-10 focus:ring-2 bg-[var(--A-800)] border-[var(--A-700)] text-[var(--A-50)] hover:bg-[var(--A-700)] focus:ring-[var(--B-500)] focus:text-[var(--A-50)]"}
            onClick={()=>buttons[value]()}
            >
            {value}
        </button>
        )})
  }
</div>

    )
}

export default ButtonGroup;