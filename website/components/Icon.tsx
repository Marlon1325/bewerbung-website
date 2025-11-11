"use client";
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  type: string
};
interface Flag_props{
        country: string,
        width?: string | number,
        height?: string | number
        className?: string
    }
    

class Icon extends React.Component<IconProps>{
    render() {
      const {type,...props} = this.props;
      switch(type){
        case "email": return <Icon.Email {...props} />;
        case "name": return <Icon.Name {...props} />;
        case "x": return <Icon.X {...props} />
        case "phone": return <Icon.Phone {...props} />
        case "date": return <Icon.Date {...props} />
        case "GitHub": return <Icon.GitHub {...props} />;
        default: return <svg></svg>
      }
    }
    static Email: React.FC<React.SVGProps<SVGSVGElement>> = (props)=>(
        <svg
              {...props}
              className="text-[var(--A-400)]" 
              aria-hidden="true"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
    )

    static Name: React.FC<React.SVGProps<SVGSVGElement>> = (props)=>(
        <svg
          {...props}
          className="text-[var(--A-400)]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
    )

    static X:  React.FC<React.SVGProps<SVGSVGElement>> = (props)=>(
        <svg 
            {...props}
            viewBox="0 0 32 32" 
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z" />
        </svg>
    )


    static Phone: React.FC<React.SVGProps<SVGSVGElement>> = (props) =>(
      <svg 
        {...props}
          className="text-[var(--A-400)]" 
          fill="currentColor"
          aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 19 18">
                <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/>
      </svg>
    )



    static Flag: React.FC<Flag_props> = ({country, width, height, className=""}) => (
            <img
                width={width}
                height={width ? undefined : height}
                src={`/flags/${country}.svg`}
                className={className}
            />
    )

    static Date: React.FC<React.SVGProps<SVGSVGElement>> = (props) =>( 
            <svg
                  {...props}
                  className="w-4 h-4 text-[var(--A-400)]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
      )

    static GitHub: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    className={`w-4 h-4 text-[var(--A-400)] ${props.className ?? ""}`}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M10 0C4.478 0 0 4.59 0 10.253c0 4.534 2.865 8.382 6.839 9.737.5.095.684-.222.684-.496 0-.238-.008-1.342-.012-2.714-2.779.616-3.366-1.18-3.366-1.18-.455-1.185-1.11-1.5-1.11-1.5-.908-.636.087-.62.087-.62 1.004.072 1.532 1.057 1.532 1.057.894 1.566 2.343 1.113 2.913.851.091-.663.35-1.115.635-1.371-2.186-.26-4.518-1.139-4.518-5.067 0-1.12.389-2.034 1.028-2.752-.103-.26-.446-1.703.098-3.115 0 0 .84-.275 2.75 1.051A9.563 9.563 0 0 1 10 4.042a9.55 9.55 0 0 1 2.504.336c1.91-1.326 2.75-1.051 2.75-1.051.544 1.412.201 2.855.099 3.115.64.718 1.028 1.632 1.028 2.752 0 3.938-2.336 4.804-4.529 5.059.36.31.68.924.68 1.863 0 1.344-.012 2.43-.012 2.76 0 .276.18.595.69.493C17.138 18.63 20 14.785 20 10.253 20 4.59 15.522 0 10 0z" />
  </svg>
);
} 



export default Icon;