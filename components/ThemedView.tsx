import { KeyboardAvoidingView, Platform, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/colorAndTheme/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  addBorder?: boolean | null;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  addBorder,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const borderColor = addBorder ?  useThemeColor(
    { light: lightColor, dark: darkColor },
    "border"
  ) : undefined;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[{ backgroundColor, borderColor }, style]}
      {...otherProps}
    />
  );
}
