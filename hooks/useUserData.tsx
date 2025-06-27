import { db, storage } from "@/firebaseConfig";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  longestStreak: number;
}

export interface UserData {
  id: string,
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
  changeName: (newName: string) => Promise<void>;
  changeAvatar: (imageUri: string | null) => Promise<string | null>;
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

  const changeName = async (newName: string) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        name: newName,
      });

      setUserData((prevUserData) => {
        if (!prevUserData) return null;

        return {
          ...prevUserData,
          name: newName,
        };
      });
    } catch (error) {
      console.error("Error saving name: ", error);
      throw error;
    }
  };

  const changeAvatar = async (imageUri: string | null) => {
    if (!imageUri || !user) return null;

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Upload image blob to Firebase
      const userAvatarRef = ref(
        storage,
        `userAvatar/${user.uid}/avatar.jpg`
      );
      await uploadBytes(userAvatarRef, blob);

      // Create download url link for public image storage reference
      const downloadURL = await getDownloadURL(userAvatarRef);

      // Then use that link to update the avatar field in user data
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        avatar: downloadURL,
      });

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
    }
  };

  return (
    <UserDataContext.Provider value={{ userData, changeName, changeAvatar }}>
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
