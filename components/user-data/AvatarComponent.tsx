import { Image } from "expo-image";
import React from "react";
import { ViewProps } from "react-native";
import { ThemedView } from "../ThemedView";

export type AvatarComponentProps = ViewProps & {
  avatar: string | null;
  size: number;
  height?: number;
  width?: number
};

export default function AvatarComponent({
  style,
  avatar,
  size,
  height, 
  width
}: AvatarComponentProps) {
  return (
    <ThemedView
      style={[
        {
          height: height ? height : size,
          width: width ? width : size,
          borderRadius: size / 2,
          borderColor: "white",
          borderWidth: 1,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Image
        source={
          avatar ? avatar : require("@/assets/images/partial-react-logo.png")
        }
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </ThemedView>
  );
}
