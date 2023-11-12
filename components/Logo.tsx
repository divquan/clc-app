import { View, Text, Image } from "react-native";
import React from "react";
// import logoImg from "../assets/logo.svg";
import { useThemeMode } from "@rneui/themed";
const Logo = () => {
  const { mode } = useThemeMode();

  return (
    <View>
      {/* <Text></Text> */}
      {mode === "light" ? (
        <Image
          source={require("../assets/logo_blue.png")}
          style={{ width: 103, height: 26.2 }}
        />
      ) : (
        <Image
          source={require("../assets/logo_white.png")}
          style={{ width: 103, height: 26.2 }}
        />
      )}
    </View>
  );
};

export default Logo;
