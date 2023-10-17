import { View, Text, Image } from "react-native";
import React from "react";
// import logoImg from "../assets/logo.svg";

const Logo = () => {
  return (
    <View>
      {/* <Text></Text> */}
      <Image
        source={require("../assets/logo_blue.png")}
        style={{ width: 103, height: 26.2 }}
      />
    </View>
  );
};

export default Logo;
