import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTouchableOpacity } from "@/components/ThemedTouchableOpacity";
import { ThemedView } from "@/components/ThemedView";
import { useUserData } from "@/hooks/user/useUserData";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MultiplayerRoom() {
  const { userData } = useUserData();

  if (!userData) {
    return (
      <ThemedView>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  const { name } = userData
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Ionicons
          name="home"
          style={styles.reactLogo}
          size={300}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Local Multiplayer</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedTouchableOpacity>
            <ThemedText>Create Room</ThemedText>
        </ThemedTouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedTouchableOpacity>
            <ThemedText>Join Room</ThemedText>
        </ThemedTouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    bottom: "-25%",
    alignSelf: "center",
    position: "absolute",
  },
});
