import { auth, db } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  loading: Boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, username: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe; // cleanup
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, username: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;
      setUser(newUser);

      // Create user profile in Firestore
      await setDoc(doc(db, "users", newUser.uid), {
        email: newUser.email,
        name: username,
        avatar: "",
        friends: [],
        friendRequests: [],
        level: 0,
        currExp: 0,
        stats: {
          durak: {
            gamesPlayed: 0,
            gamesWon: 0,
            longestStreak: 0,
          },
          blackjack: {
            gamesPlayed: 0,
            gamesWon: 0,
            longestStreak: 0,
          },
        },
        lastPlayed: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error("Error signing up: ", error.message);
      throw error;
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
