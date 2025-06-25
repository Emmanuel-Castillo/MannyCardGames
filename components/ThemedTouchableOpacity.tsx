import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTouchableOpacityProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTouchableOpacity({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTouchableOpacityProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "touchableOpacityBackground"
  );

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor,
        },
        style,
      ]}
      {...rest}
    />
  );
}
