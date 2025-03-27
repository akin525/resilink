import { InputProps } from "../../../types/Interface";

export const CustomInput: React.FC<InputProps> = ({
  handleChange,
  label,
  type,
  name,
  placeholder,
}) => {
  return (
    <>
      <section className="w-full mb-3">
        {label && (
          <label className="text-base text-gray-900 font-medium">{label}</label>
        )}
        <input
          type={type}
          name={name}
          className="w-full bg-transparent py-3 px-4 rounded-md border border-para font-medium outline-none text-base text-gray-900 font-Plus"
          placeholder={placeholder}
          autoComplete="off"
          onChange={handleChange}
        />
      </section>
    </>
  );
};
