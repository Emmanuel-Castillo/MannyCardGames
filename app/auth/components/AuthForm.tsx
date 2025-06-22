import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type AuthFormProps = {
  formTitle: string;
  onFormSubmit: (email: string, password: string) => Promise<void>;
  authPageToggleText: string;
  authPageToggleOnPress: () => void;
};

export default function AuthForm({
  formTitle,
  onFormSubmit,
  authPageToggleText,
  authPageToggleOnPress,
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Form validation states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Authentication error state
  const [authError, setAuthError] = useState("");

  // Disables UI when form is submitted
  const [loading, setLoading] = useState(false);

  const validateAndSubmitForm = async (email: string, password: string) => {
    // Reset states + flag
    let valid = true;
    setLoading(true);
    setAuthError("");
    setEmailError("");
    setPasswordError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
      valid = false;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    if (!valid) {
      setLoading(false);
      return;
    }

    try {
      await onFormSubmit(email, password);
    } catch (e: any) {
      // console.error("Login error: ", e.code || e.message);
      setAuthError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.formContainer}>
      <ThemedText
        type="title"
        style={{
          textAlign: "center",
          height: 50,
        }}
      >
        {formTitle}
      </ThemedText>
      <ThemedTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />
      {emailError ? (
        <ThemedText style={styles.errorText}>{emailError}</ThemedText>
      ) : null}
      <ThemedTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        editable={!loading}
        secureTextEntry
      />
      {passwordError ? (
        <ThemedText style={styles.errorText}>{passwordError}</ThemedText>
      ) : null}
      {authError ? (
        <ThemedText style={styles.errorText}>{authError}</ThemedText>
      ) : null}
      {loading ? (
        <ActivityIndicator size="large" color="#1E90FF" />
      ) : (
        <TouchableOpacity
          style={styles.formButton}
          onPress={() => validateAndSubmitForm(email, password)}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      )}

      <ThemedText style={{ textAlign: "center" }}>
        Don't have an account?{" "}
        <ThemedText
          style={{ color: "#1E90FF" }}
          onPress={authPageToggleOnPress}
        >
          {authPageToggleText}
        </ThemedText>
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingHorizontal: 40,
  },
  formContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 24,
  },
  formButton: {
    width: "100%",
    height: 50,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#1E90FF",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 12,
    marginTop: -20,
  },
});
