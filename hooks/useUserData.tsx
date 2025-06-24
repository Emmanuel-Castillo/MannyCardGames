import { db } from "@/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  longestStreak: number;
}

export interface UserData {
  email: string;
  name: string;
  avatar: string | null;
  friends: string[];
  friendRequests: string[];
  level: number;
  currExp: number;
  stats: {
    [gameKey: string]: GameStats; // flexibility for new games
  };
  lastPlayed: string;
  createdAt: string;
}

// Type defined for user data context
type UserDataContextType = {
  userData: UserData | null;
};

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

// Provides context about user data after user auth
export const UserDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (!user) {
      setUserData(null);
      return;
    }

    // Grabs current user's uid and requests its own data from Firestore
    const unsub = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data as UserData);
      } else {
        setUserData(null);
      }
    });

    return () => unsub();
  }, [user]);

  return (
    <UserDataContext.Provider value={{ userData }}>
      {children}
    </UserDataContext.Provider>
  );
};

// React hook to use user data context provided by UserDatContext.Provider
export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within an UserDataProvider");
  }
  return context;
}
