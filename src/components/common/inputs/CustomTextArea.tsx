import React from "react";
import { TextAreaProps } from "../../../types/Interface";

export const CustomTextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  placeholder,
  handleChange,
  cols,
  rows
}) => {
  return (
    <>
      <section className="mb-2 flex items-center w-full">
        <section className="w-full">
          {label && <label className="text-para text-xs font-medium mb-3">{label} </label>}
          <textarea
            name={name}
          className="w-full bg-transparent py-3 px-4 rounded-md border border-para text-para text-sm font-medium outline-none"
            placeholder={placeholder}
            autoComplete="off"
            cols={cols}
            rows={rows}
            onChange={(e) => handleChange(e)}
          />
        </section>
      </section>
    </>
  );
};
