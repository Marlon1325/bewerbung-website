
import language_flags from "./language_flags";
import { Icon } from "@/components";

interface Language_div_args{
  language: string,
  text_class?: string,
  svg_width?: string | number,

}

const LangWithFlag: React.FC<Language_div_args> = ({language, svg_width, text_class=""}) => (
        <div className="flex items-center gap-2">
                <Icon.Flag country={language_flags[language]} width={svg_width} />
                <span className={text_class + " text-[var(--A-50)]"}> {language} </span>
        </div>
    )


export default LangWithFlag;