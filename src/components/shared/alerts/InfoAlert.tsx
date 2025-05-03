import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

type InfoAlertProps = {
    message: string;
};

const InfoAlert: React.FC<InfoAlertProps> = ({ message }) => {
    return (
        <div className="flex items-start border border-gray-200 shadow-sm rounded-md bg-white text-sm text-gray-700 w-full max-w-lg">
            {/* Colored left bar */}
            <div className="w-1.5 rounded-l-md bg-gradient-to-b from-cyan-400 to-blue-500" />

            {/* Content */}
            <div className="flex items-start px-4 py-3 gap-3">
                <AiOutlineInfoCircle className="text-blue-500 mt-0.5" size={20} />
                <span className="text-base leading-relaxed">{message}</span>
            </div>
        </div>
    );
};

export default InfoAlert;
