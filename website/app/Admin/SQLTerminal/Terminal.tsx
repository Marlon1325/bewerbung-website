import React, { useState } from "react";
import { getSegments } from "sql-highlight";


type Colors = {
        keyword?: string   
        function?: string  
        number?: string 
        string?: string   
        special?:  string 
        bracket?:  string  
        comment?:  string
        clear?: string
    }

interface SQLProps{
    colors?: Colors,
    onChange: (e:React.ChangeEvent<any>)=> any,
    value: string
}


const defaultcolors: Record<string, string> = {
  keyword: "#1447e6",  
  function: "#BA55D3", 
  number: "#32CD32", 
  string: "#CE9178", 
  special: "#FF4500",   
  bracket: "#D3D3D3",
  comment: "#808080",
  clear: "#ffffff"   
};


export default function Terminal({ value, onChange, colors = {}  }: SQLProps) {
  const merged_colors: Colors = { ...defaultcolors, ...colors };

  return (
    <div className="relative w-full max-w-md h-64">
      {/* Hintergrund-Div / Highlight Overlay */}
      <div
  className="absolute top-0 left-0 w-full h-full rounded-lg border border-[var(--A-600)] bg-[var(--A-700)] p-2 text-md break-words"
>
        {getSegments(value).map(({ name, content }, idx) => (
          <span
            key={idx}
            style={{
              color: merged_colors[name as keyof Colors] || merged_colors.clear

            }}
          >
            {content}
          </span>
        ))}
      </div>

      {/* Textarea oben drauf */}
      <textarea
        rows={8}
        cols={10}
        value={value}
        onChange={onChange}
        spellCheck={false}
        autoCorrect="off"
        autoComplete="off"
        className="relative p-2 m-0 w-full h-full text-transparent text-md bg-transparent rounded-lg p-2 resize-none caret-[var(--A-50)]"
      />
    </div>
  );
}
