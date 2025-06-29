// app/auth/signin.tsx
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/user/useAuth";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import AuthForm from "./components/AuthForm";

export default function SignInScreen() {
  const { signIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/(tabs)/home"); // or /tabs or wherever your home is
    }
  }, [user]);

  // Await useAuth signIn method to return Promise
  const loginUser = async (email: string, password: string) => {
    await signIn(email, password)
  };

  return (
    <ThemedView style={styles.viewContainer}>
      <AuthForm
        formTitle="Login"
        authPageToggleText="Sign up"
        authPageToggleOnPress={() => router.replace("/auth/signup")}
        onFormSubmit={loginUser}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingHorizontal: 40,
  }
});
