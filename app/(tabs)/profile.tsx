import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTouchableOpacity } from "@/components/ThemedTouchableOpacity";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useUserData } from "@/hooks/useUserData";
import { getExpForLevel, getProgress } from "@/utils/leveling";
import { capitalizeFirstLetter } from "@/utils/stringFormatting";

export default function ProfileScreen() {
  const { userData } = useUserData();

  if (!userData) {
    return null;
  }
  const { name, avatar, level, currExp, stats } = userData;
  const expToNextLevelProgress = getProgress(currExp, level);
  const expToNextLevel = getExpForLevel(level + 1);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        // Avatar image container component (to be reused later)
        <ThemedView
          style={{
            height: 150,
            width: 150,
            backgroundColor: "blue",
            position: "absolute",
            bottom: -20,
            alignSelf: "center",
            borderRadius: 75,
            overflow: "hidden",
            alignContent: "center",
          }}
        >
          <Image
            source={
              avatar
                ? avatar
                : require("@/assets/images/partial-react-logo.png")
            }
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </ThemedView>
      }
    >
      <ThemedView style={styles.profileContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{name}</ThemedText>
        </ThemedView>

        {/* Level and exp progress bar component (to be reused later) */}
        <ThemedView style={styles.progressBarContainer}>
          <ThemedView
            darkColor="#123cad"
            lightColor="#12afff"
            style={styles.levelIndicator}
          >
            <ThemedText>{level}</ThemedText>
          </ThemedView>
          <ThemedView
            style={{
              width: `${expToNextLevelProgress * 100}%`,
              height: "100%",
              backgroundColor: "#4caf50",
              borderRadius: 5,
            }}
          ></ThemedView>
          <ThemedText
            style={{ position: "absolute", right: 0, bottom: -25, zIndex: 1 }}
          >
            {currExp} / {expToNextLevel}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.gameStatsContainer} addBorder={true}>
          <ThemedText
            type="subtitle"
            style={{ textAlign: "center", textDecorationLine: "underline" }}
          >
            Game Stats
          </ThemedText>
          {Object.entries(stats).map(([key, value]) => {
            return (
              <Collapsible title={capitalizeFirstLetter(key)} key={key}>
                <ThemedView
                  darkColor="grey"
                  lightColor="lightgrey"
                  style={styles.singleGameStatsContainer}
                >
                  <ThemedText>Games Played: {value.gamesPlayed}</ThemedText>
                  <ThemedText>Games Won: {value.gamesWon}</ThemedText>
                  <ThemedText>Longest Streak: {value.longestStreak}</ThemedText>
                </ThemedView>
              </Collapsible>
            );
          })}
        </ThemedView>
      </ThemedView>

      {/* Themed touchable opacity placed at bottom right corner of screen (can be reused later) */}
      <ThemedTouchableOpacity
        onPress={() => {}}
        style={{
          width: 55,
          position: "absolute",
          bottom: 10,
          right: 25,
          borderRadius: 30,
          padding: 8,
        }}
      >
        <IconSymbol name="pencil" color="#808080" size={40} />
      </ThemedTouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    gap: 32,
  },
  titleContainer: {
    alignItems: "center",
  },
  progressBarContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    position: "relative",
  },
  levelIndicator: {
    position: "absolute",
    zIndex: 1,
    left: -10,
    top: -10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
  },
  gameStatsContainer: {
    flex: 1,
    gap: 16,
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
  },
  singleGameStatsContainer: {
    borderRadius: 4,
    padding: 8,
    gap: 4,
  },
});
