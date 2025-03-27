export interface ButtonProps {
  children: React.ReactNode;
  onClick?: any;
  disabled?: boolean;
  className?: string;
  bgColor?: string;
  type?: "button" | "submit" | "reset";
}

export interface InputProps {
  label: string;
  handleChange?: any;
  type?: string;
  placeholder?: string;
  name?: string;
  cols?: number;
  rows?: number;
}

export interface TextAreaProps {
  label: string;
  handleChange: any;
  type?: string;
  placeholder?: string;
  name?: string;
  cols?: number;
  rows?: number;
}

export interface SelectProps {
  label: string;
  handleChange: any;
  type?: string;
  placeholder?: string;
  name?: string;
  options?: any;
}

export interface UploadProps {
  label: string;
  images?: any;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  handleEdit: any;
  handleRemove: any;
  inputRef: React.RefObject<HTMLInputElement>;
}

export interface AccordionItem {
  title: string;
  icon: React.ReactNode;
  content: string;
  isOpen?: boolean;
}

export interface LogoProps {
  color?: string;
}

export interface RootState {
  action: {
    sidenav: boolean;
    topnav: boolean;
  };
  user: {
    loading: boolean;
    data: RegisterUserResponse | null;
    error: string | null;
    token: string | null;
    isLoggedIn: boolean;
  };
  listing: {
    listings: any;
    listings_loading: boolean;
    listings_error: string | null;
    listing_details: {
      location: {
        address: string;
        city: string;
        state: string;
        country: string;
      };
      _id: string;
      title: string;
      type: string;
      mode: string;
      status: string;
      price: number;
      commission: number;
      totalPrice: number;
      rooms: number;
      description: string;
      images: string[];
      video: string;
      postedBy: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        profilePic: string;
      };
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    listing_details_loading: boolean;
    listing_details_error: string | null;
  };
  account: {
    data: any;
    user: object | null;
    uLoading: boolean;
    status: string | null;
    error: string | null;
  };
  payment: {
    loading: boolean;
    paymentDetails: {
      data: {
        paymentUrl: string;
      };
    };
    error: string | null;
  };
}

export interface ListingProps {
  propList: {
    [x: string]: any;
    postedBy: any;
    displayImage: string;
    listingType: string;
    amount: string;
    rentalPeriod: string;
    propertyName: string;
    location: {
      address: string;
    };
    bedrooms: number;
    bathrooms: number;
    sqFt: number;
    garage: number;
    agentInCharge: {
      title: string;
      firstName: string;
      profilePic: string;
    };
    postedDate: string;
  };
}

export interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ToastOptionsData {
  position: string;
  autoClose: string;
  pauseOnHover: boolean;
  draggable: boolean;
  theme: string;
}

// src/types/userTypes.ts

// Type for user registration request payload
export interface RegisterUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Type for user registration response
export interface RegisterUserResponse {
  token: string;
  message: string;
  status: boolean;
  // Add other fields if needed
}

export interface HandleChangeData {
  target: {
    name: string;
    value: string;
  };
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}
