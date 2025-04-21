import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import { SelectProps } from "../../../types/Interface";

export const CustomSelect: React.FC<SelectProps> = ({
                                                        handleChange,
                                                        label,
                                                        options,
                                                        name,
                                                    }) => {
    return (
        <div className="w-full space-y-2">
            {label && (
                <label className="block text-sm font-medium text-[#202224]">
                    {label}
                </label>
            )}
            <select
                name={name}
                onChange={handleChange}
                className="w-full appearance-none bg-[#F2F4F7] border border-[#E5E7EB] text-[#202224] text-sm font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0000C8]"
            >
                <option value="">Select Option</option>
                {options?.map(
                    (
                        data: {
                            value: string | number | readonly string[] | undefined;
                            text:
                                | string
                                | number
                                | boolean
                                | ReactElement<any, string | JSXElementConstructor<any>>
                                | Iterable<ReactNode>
                                | ReactPortal
                                | null
                                | undefined;
                        },
                        id: Key | null | undefined
                    ) => (
                        <option key={id} value={data?.value}>
                            {data?.text}
                        </option>
                    )
                )}
            </select>
        </div>
    );
};
