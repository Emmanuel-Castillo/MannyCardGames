import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedTouchableOpacity } from "@/components/ThemedTouchableOpacity";
import { ThemedView } from "@/components/ThemedView";
import AvatarComponent from "@/components/user-data/AvatarComponent";
import { useUserData } from "@/hooks/useUserData";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, ColorValue } from "react-native";

export default function editProfile() {
  const { userData, changeAvatar, changeName } = useUserData();
  const router = useRouter();

  if (!userData) {
    return null;
  }

  const { name, avatar } = userData;
  const [formName, setFormName] = useState(name);
  const [formAvatar, setFormAvatar] = useState(avatar);
  const [showFormButtoms, setShowFormButtoms] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (formName != name || formAvatar != avatar) {
      setShowFormButtoms(true);
    } else {
      setShowFormButtoms(false);
    }
  }, [formName, formAvatar]);

  const handleChooseImageButtonPress = async () => {
    try {
      const uri = await pickImage();
      if (!uri) return;
      setFormAvatar(uri);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsMultipleSelection: false,
      });

      if (!result.canceled) {
        return result.assets[0].uri;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const submitForm = async () => {
    setFormLoading(true);
    if (name != formName && formName.length > 0) {
      await changeName(formName);
    }

    if (avatar != formAvatar) {
      const imgDownloadUri = await changeAvatar(formAvatar);
      if (!imgDownloadUri) {
        console.error("Something went wrong...");
        return;
      }
      setFormAvatar(imgDownloadUri);
    }

    Alert.alert("Success", "Saved new user data!");
    setFormLoading(false);
  };

  const handleClearChangesButtonPress = () => {
    setFormName(name);
    setFormAvatar(avatar);
  };

  type IconName = React.ComponentProps<typeof Ionicons>["name"];
  type IconButtonProps = {
    backgroundColor?: ColorValue | undefined;
    bottom: number;
    iconName: IconName;
    buttonText: string;
    onButtonPress: () => void;
  };
  function IconButton({
    backgroundColor,
    bottom,
    iconName,
    buttonText,
    onButtonPress,
  }: IconButtonProps) {
    return (
      <ThemedTouchableOpacity
        onPress={onButtonPress}
        style={{
          backgroundColor: backgroundColor,
          width: "35%",
          position: "absolute",
          bottom: bottom,
          right: 0,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          padding: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        disabled={formLoading}
      >
        <Ionicons name={iconName} size={30} />
        <ThemedText style={{ color: "black" }}>{buttonText}</ThemedText>
      </ThemedTouchableOpacity>
    );
  }

  return (
    <ThemedView style={{ flex: 1, padding: 32, gap: 32 }}>
      <IconButton
        bottom={50}
        iconName="arrow-back"
        buttonText="Go back"
        onButtonPress={() => router.back()}
      />

      {showFormButtoms && (
        <>
          <IconButton
            backgroundColor={"lightgreen"}
            bottom={110}
            iconName="save"
            buttonText="Save"
            onButtonPress={submitForm}
          />
          <IconButton
            backgroundColor={"pink"}
            bottom={170}
            iconName="close"
            buttonText="Cancel"
            onButtonPress={handleClearChangesButtonPress}
          />
        </>
      )}
      <ThemedText type="title" style={{ textAlign: "center" }}>
        Settings
      </ThemedText>

      <ThemedView style={{ gap: 4 }}>
        <ThemedText>Name:</ThemedText>
        <ThemedTextInput
          value={formName}
          onChangeText={setFormName}
          maxLength={15}
          editable={!formLoading}
        />
      </ThemedView>

      <ThemedView style={{ gap: 4 }}>
        <ThemedText>Avatar file:</ThemedText>
        <ThemedView
        
        lightColor="lightgrey"
        darkColor="grey"
        style={{padding: 4, borderRadius: 4}}>
          <ThemedText>{avatar ? avatar : "Empty file"}</ThemedText>
        </ThemedView>

        <Button
          title="Choose image"
          onPress={handleChooseImageButtonPress}
          disabled={formLoading}
        />
      </ThemedView>

      <AvatarComponent
        avatar={formAvatar}
        size={200}
        style={{ alignSelf: "center" }}
      />
    </ThemedView>
  );
}
