import { Button, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTouchableOpacity } from "@/components/ThemedTouchableOpacity";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/user/useAuth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Href, useRouter } from "expo-router";

type ClearSettingsButtonPropsType = {
  endpoint: Href;
  buttonText: string;
};

export default function SettingsScreen() {
  const { logOut } = useAuth();
  const router = useRouter();

  const buttonsList: ClearSettingsButtonPropsType[] = [
    { buttonText: "Edit Profile", endpoint: "/settings/editProfile" },
    { buttonText: "App Preferences", endpoint: "/settings/appPreferences" },
  ];

  function ClearSettingsButton({
    endpoint,
    buttonText,
  }: ClearSettingsButtonPropsType) {
    return (
      <ThemedTouchableOpacity
        onPress={() => router.push(endpoint)}
        style={{
          backgroundColor: "transparent",
          borderWidth: 1,
          borderRadius: 8,
          padding: 8,
        }}
      >
        <ThemedText>{buttonText}</ThemedText>
      </ThemedTouchableOpacity>
    );
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Ionicons name="settings-outline" style={styles.iconLogo} size={300} />
      }
    >
      <ThemedView style={{ flex: 1, gap: 32 }}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Settings</ThemedText>
        </ThemedView>
        <ThemedView style={styles.buttonsContainer}>
          {buttonsList.map((button) => {
            return (
              <ClearSettingsButton
                buttonText={button.buttonText}
                endpoint={button.endpoint}
                key={button.buttonText}
              />
            );
          })}
        </ThemedView>

        <Button title="Logout" onPress={() => logOut()} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
  },
  buttonsContainer: {
    gap: 8,
  },
  stepContainer: {
    marginBottom: 8,
  },
  iconLogo: {
    bottom: "-25%",
    alignSelf: "center",
    position: "absolute",
  },
});
