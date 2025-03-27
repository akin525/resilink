import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import { SelectProps } from "../../../types/Interface";

export const CustomSelect: React.FC<SelectProps> = ({
  handleChange,
  label,
  options,
  name,
}) => {
  return (
    <>
      <section className="w-full mb-3">
          {label && <label className="text-para text-xs font-medium mb-3">
            {label}
          </label>}
          <select className="w-full bg-transparent py-3 px-4 rounded-md border border-para text-para text-sm font-medium outline-none" name={name} onChange={handleChange}>
            {options?.map((data: { value: string | number | readonly string[] | undefined; text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, id: Key | null | undefined) => (
              <option key={id} value={data?.value}>{data?.text}</option>
            ))}
          </select>
      </section>
    </>
  );
};
