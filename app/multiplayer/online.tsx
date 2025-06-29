import { Button, Modal, StyleSheet, Switch } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTouchableOpacity } from "@/components/ThemedTouchableOpacity";
import { ThemedView } from "@/components/ThemedView";
import { useUserData } from "@/hooks/user/useUserData";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { useState } from "react";

export default function OnlineMultiplayerRoom() {
  const { userData } = useUserData();
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [loadingRoomCreation, setLoadingRoomCreation] = useState(false);

  const handleCreateRoomButtonClick = () => {
    setShowCreateRoomModal(true)
  };

  const handleModalCreateRoomButtonClick = () => {
    setLoadingRoomCreation(true)
  }

  if (!userData) {
    return (
      <ThemedView>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  const { name } = userData;
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Ionicons name="home" style={styles.reactLogo} size={300} />}
    >
      {showCreateRoomModal && (
        <Modal transparent={true}>
          <BlurView
            intensity={10}
            style={styles.blurViewContainer}
            experimentalBlurMethod="dimezisBlurView"
          >
            <ThemedView style={styles.centerModalViewContainer}>
              {loadingRoomCreation ? (
                <>
                <ThemedText>Creating room...</ThemedText></>
              ) : (
                <>
                  <ThemedText
                    type="defaultSemiBold"
                    style={{ textAlign: "center" }}
                  >
                    Room Settings
                  </ThemedText>
                  <ThemedView style={{ flex: 1 }}>
                    <ThemedView style={styles.roomSettingViewContainer}>
                      <ThemedText>Friends Only?</ThemedText>
                      <Switch />
                    </ThemedView>
                  </ThemedView>
                  <Button
                    title="Close"
                    onPress={() => {
                      if (showCreateRoomModal) setShowCreateRoomModal(false);
                    }}
                  />
                  <Button
                    title="Create Room"
                    onPress={handleModalCreateRoomButtonClick}
                  />
                </>
              )}
            </ThemedView>
          </BlurView>
        </Modal>
      )}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Online Multiplayer</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedTouchableOpacity onPress={handleCreateRoomButtonClick}>
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
  blurViewContainer: {
    flex: 1,
    justifyContent: "center",
  },
  centerModalViewContainer: {
    backgroundColor: "lightgrey",
    width: "50%",
    height: "50%",
    alignSelf: "center",
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  roomSettingViewContainer: {
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
});
