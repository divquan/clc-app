import { View, Text, Button } from "react-native";
import React from "react";
import { useThemeMode } from "@rneui/themed";
import { removeItemFromAsyncStorage } from "../lib/AsyncStorage";

const Settings = () => {
  const { mode, setMode } = useThemeMode();
  const handleThemeChange = () => {
    if (mode == "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };
  return (
    <View>
      <Text>Settings</Text>
      <Button title="Change theme" onPress={handleThemeChange} />
      <Button
        title="Delete some data"
        onPress={async () => {
          await removeItemFromAsyncStorage("fullName");
          await removeItemFromAsyncStorage("email");
          console.log("Deleted");
        }}
      />
      <Button title="Change theme" onPress={handleThemeChange} />
    </View>
  );
};

export default Settings;
