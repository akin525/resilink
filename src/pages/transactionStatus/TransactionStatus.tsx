import { useNavigate, useSearchParams } from "react-router-dom";

const TransactionStatus = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Determine transaction status from the URL
  const status = searchParams.get("status");

  // Content based on the status
  const isSuccess = status === "success";

  const title = isSuccess
    ? "Payment Successful"
    : "Payment Failed";
  const message = isSuccess
    ? "Your transaction was completed successfully. Thank you!"
    : "Your transaction could not be completed. Please try again or contact support.";
  const buttonText = isSuccess
    ? "Back to Dashboard"
    : "Retry Payment";
  const secondaryButtonText = isSuccess
    ? "View Details"
    : "Contact Support";
  const primaryButtonAction = () => {
    if (isSuccess) navigate("/dashboard");
    else navigate("/retry-payment");
  };
  const secondaryButtonAction = () => {
    if (isSuccess) navigate("/transaction/details");
    else navigate("/support");
  };
  const icon = isSuccess ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-green-600"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10.293 14.707a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L10 12.586l6.293-6.293a1 1 0 111.414 1.414l-7 7z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-red-600"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10.293 13.707a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0l14 14a1 1 0 01-1.414 1.414l-14-14a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${
        isSuccess ? "bg-green-50" : "bg-red-50"
      }`}
    >
      <div className="text-center">
        <div className="mb-6">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {icon}
          </div>
        </div>
        <h2
          className={`text-2xl font-bold ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {title}
        </h2>
        <p className="mt-4 text-gray-700">{message}</p>
        <div className="mt-6 space-x-4">
          <button
            className={`px-6 py-2 text-white rounded ${
              isSuccess ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={primaryButtonAction}
          >
            {buttonText}
          </button>
          <button
            className={`px-6 py-2 bg-white border rounded ${
              isSuccess
                ? "text-green-600 border-green-600 hover:bg-green-50"
                : "text-red-600 border-red-600 hover:bg-red-50"
            }`}
            onClick={secondaryButtonAction}
          >
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatus;
