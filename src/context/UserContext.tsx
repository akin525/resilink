import { createContext, useContext, useState } from "react";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    type: string;
    profile_photo_path: string | null;
    ref_code: string;
    referral: string;
    status: string;
    created_at?: string;
    updated_at?: string;
    // You can add more if your backend sends more
}

interface UserContextType {
    user: User | null;
    setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
    {children}
    </UserContext.Provider>
);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};
