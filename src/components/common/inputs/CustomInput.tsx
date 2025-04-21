import { InputProps } from "../../../types/Interface";

export const CustomInput: React.FC<InputProps> = ({
                                                      handleChange,
                                                      label,
                                                      type,
                                                      name,
                                                      placeholder,
                                                  }) => {
    return (
        <section className="w-full mb-3">
            {label && (
                <label className="text-sm font-semibold text-[#202224] block mb-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                autoComplete="off"
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-md border border-[#D9D9D9] bg-white text-[#202224] text-sm font-medium outline-none focus:ring-2 focus:ring-[#0000C8] transition duration-200"
            />
        </section>
    );
};
