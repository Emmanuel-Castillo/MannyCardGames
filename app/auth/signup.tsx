// app/auth/signin.tsx
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import AuthForm from "./components/AuthForm";

export default function SignUpcreen() {
  const { signUp, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/(tabs)/home"); // or /tabs or wherever your home is
    }
  }, [user]);

  const registerUser = async (email: string, password: string, userName: string) => {
    await signUp(email, password, userName);
  };

  return (
    <ThemedView style={styles.viewContainer}>
      <AuthForm
        formTitle="Sign Up"
        authPageToggleText="Login"
        authPageToggleOnPress={() => router.replace("/auth/login")}
        onFormSubmit={registerUser}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingHorizontal: 40,
  },
});
