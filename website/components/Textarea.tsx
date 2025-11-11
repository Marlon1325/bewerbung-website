import React, { TextareaHTMLAttributes, useId } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string,
  className?: string
}

const Textarea: React.FC<TextareaProps> = ({ label, id, className="", ...props }) => {
  const generated_ID = useId();
  id = id ?? generated_ID;
  return (
    <div className="w-full my-2">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-[var(--A-50)]"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={className+" block p-2.5 w-full text-sm text-[var(--A-50)] bg-[var(--A-700)] rounded-lg border border-[var(--A-600)] focus:ring-[var(--B-500)] focus:border-[var(--B-500)]"}
        {...props}
      />
    </div>
  );
};

export default Textarea;
