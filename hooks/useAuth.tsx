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

// Type defined for auth context
type AuthContextType = {
  user: User | null;
  loading: Boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provides context through entire app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Adds observer to user's sign in state
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

  const signUp = async (email: string, password: string, username: string ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;
      setUser(newUser);

      // Create user profile in Firestore once registration is complete
      await setDoc(doc(db, "users", newUser.uid), {
        id: newUser.uid,
        email: newUser.email,
        name: username,
        avatar: null,
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

// React hook to use auth context provided by AuthContext.Provider
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
