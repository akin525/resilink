import React from "react";
import { ProgressBar } from "react-loader-spinner";

export const ProgressBarLoader: React.FC = () => {
    return (
        <ProgressBar
            visible={true}
            height="60"
            width="100"
            barColor="#0000BF"
            borderColor="#0000BF"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
};
