import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
// import { Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { setItemToAsyncStorage } from "../lib/AsyncStorage";
// import image from "../assets/logo_blue.png";
const { width, height } = Dimensions.get("window");
const OnboardingScreen = () => {
  const navigation = useNavigation();

  const onDone = async () => {
    await setItemToAsyncStorage("onboarding", "true");
    navigation.navigate("Login");
  };

  const doneButton = () => {
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: 10,
          backgroundColor: "#1f43d1",
          padding: 8,
          paddingHorizontal: 16,
          borderRadius: 14,
        }}
        onPress={async () => {
          await onDone();
        }}
      >
        <Text style={{ fontSize: 18, color: "white" }}>Done</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 0 }}>
      <Onboarding
        containerStyles={{ paddingHorizontal: 10 }}
        titleStyles={{ fontSize: 28, fontWeight: "bold" }}
        SkipButtonComponent={() => <View></View>}
        DoneButtonComponent={doneButton}
        pages={[
          {
            backgroundColor: "#eae5d4",
            image: (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Image
                  style={{ width: 200, height: 200, resizeMode: "contain" }}
                  source={require("../assets/logo_blue.png")}
                />
              </View>
            ),

            title: "CLC",
            subtitle: "Conforming God's People to the Image of Christ",
          },
          {
            backgroundColor: "#c0c8d1",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../assets/animations/anim2.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Daily Devotions and Biblical Insights",
            subtitle:
              "Immerse Yourself in Uplifting Articles and Scripture Reflections",
          },
          {
            backgroundColor: "aquamarine",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../assets/animations/anim1.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Connect with Believers Worldwide",
            subtitle:
              "Share Prayers, Engage in Discussions, and Foster Spiritual Friendships",
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  lottie: {
    height: width * 0.6,
    width: width * 0.9,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    width: width * 0.9,
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 16,
  },
});
