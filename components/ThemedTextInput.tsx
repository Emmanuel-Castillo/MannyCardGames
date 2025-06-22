import { TextInput, type TextInputProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  editable = true, // Default to true
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    editable ? "background" : "disabledBackground"
  );
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "border"
  );

  return (
    <TextInput
      style={[
        {
          color,
          backgroundColor,
          borderColor,
          borderWidth: 1,
          paddingHorizontal: 8,
          paddingVertical: 16,
          borderRadius: 8,
        },
        style,
      ]}
      placeholderTextColor={color}
      {...rest}
    />
  );
}
