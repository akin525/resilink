import React, {useState} from "react";
import { ListingProps, RootState } from "../../../types/Interface.tsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import {Trash2} from "lucide-react";
import { BASE_URL } from "../../../utils/apiRoutes";


const PropList: React.FC<ListingProps> = ({ propList }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const [isDeleting, setIsDeleting] = useState(false); // State to track delete operation

  const listingUrl = isLoggedIn
      ? `/dashboard/listings/${propList._id}`
      : `/listings/details/${propList._id}`;

  // FALLBACK IMAGE NEEDS TO BE ADDED INCASE PROP DOESNT HAVE IMG
  const imageUrl = propList.images?.[0] || "/fallback-image.jpg";
  const user = propList.postedBy;
  const formattedDate = new Date(propList.createdAt).toLocaleDateString();

  const handleDelete = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation(); // Prevent navigation
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    setIsDeleting(true); // Show loader

    try {
      const response = await fetch(`${BASE_URL}/v1/agent/listing/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "9ad07a9b7091e49b6afefa0c29d94d33:4449927ec0f020683862aa898eaf1f02c5087aed610ee170878b7381674ae453",
        },
      });

      if (!response.ok) throw new Error("Failed to delete listing");

      console.log(`Listing with ID: ${id} deleted successfully.`);
      window.location.reload(); // Refresh or update state
    } catch (error) {
      console.error("Error deleting listing:", error);
    } finally {
      setIsDeleting(false); // Hide loader
    }
  };
  return (
      <div
          onClick={() => navigate(listingUrl)}
          className="rounded-lg border cursor-pointer text-card-foreground shadow-sm group overflow-hidden transition-all duration-300 hover:shadow-lg"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
              loading="lazy"
              decoding="async"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              src={imageUrl}
              alt={propList.displayImage || "Property image"}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute left-4 right-4 top-4 flex justify-between">
          <span className="rounded-full bg-bc p-1 px-3 text-sm font-medium text-white flex items-center justify-center">
            For {propList.mode === "RENT" ? "Rent" : "Sale"}
          </span>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="inline-flex items-center justify-center gap-2 text-sm font-medium h-8 w-8 rounded-full bg-white/90 hover:bg-white transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to favorites</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {isLoggedIn && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                          onClick={(event) => handleDelete(event, propList._id)}
                          disabled={isDeleting} // Disable when deleting
                          className={`inline-flex items-center justify-center gap-2 text-sm font-medium h-8 w-8 rounded-full ${
                              isDeleting ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                          } text-white transition-colors`}
                      >
                        {isDeleting ? (
                            <svg
                                className="animate-spin h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8H4z"
                              ></path>
                            </svg>
                        ) : (
                            <Trash2 className="h-4 w-4" />
                        )}
                        <span className="sr-only">Delete listing</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete listing</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
            )}
          </div>

          <div className="absolute bottom-4 left-4">
            <p className="text-2xl font-bold text-white">
              {new Intl.NumberFormat("en-US", { style: "currency", currency: "NGN" }).format(propList.price)}

              <span className="text-sm font-normal">/Yr</span>
            </p>
          </div>
        </div>

        <div className="grid gap-2 p-4">
          <h3 className="text-xl font-semibold tracking-tight">
            {propList.title}
          </h3>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> {propList.location?.address}
          </p>
        </div>

        <div className="flex items-center justify-between border-t p-4">
          <div className="flex items-center gap-2">
          <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
            <img
                className="aspect-square h-full w-full"
                alt={`${user?.firstName} ${user?.lastName}`}
                src={user?.profilePic || "/default-avatar.jpg"}
            />
          </span>
            <div className="text-sm">
              <p className="font-medium leading-none">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" /> {formattedDate}
          </div>
        </div>
      </div>
  );
};

export default PropList;

const Heart = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
        {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
);

const MapPin = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
        {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
);

const Calendar = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
        {...props}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
);
