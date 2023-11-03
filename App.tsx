import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import Component from "./components/MyComponent";
import BottomTab from "./Stacks/BottomTab";
import { NavigationContainer } from "@react-navigation/native";
import { getPostIdFromSlug } from "./lib/api.request";
import { Linking } from "react-native";

const theme = createTheme({
  lightColors: {
    primary: "#1877F2", // A shade of blue
    secondary: "#3A3B3C", // A shade of green (complementary color)
    background: "#fff", // A light gray or off-white for background
    divider: "#bdc3c7", // A lighter shade of gray for dividers
    black: "#2c3e50",
  },
  darkColors: {
    background: "#1C1E21", // A dark gray or charcoal for the background
    primary: "#1877F2", // A slightly darker shade of blue for dark mode
    secondary: "#B0B3B8", // body texts
    divider: "#3A3B3C", // A subdued gray for dividers in dark mode
  },
});

export default function App({ navigation }: { navigation: any }) {
  // useEffect(() => {
  //   const handleDeepLink = ({ url }: { url: string }) => {
  //     const route = url.replace(/.*?:\/\//g, "");

  //     // Check if the deep link matches the expected pattern
  //     if (route.startsWith("https://clcgh.org/")) {
  //       // Extract the post path from the URL
  //       const postPath = route.replace("https://clcgh.org/", "");
  //       const postID = getPostIdFromSlug(postPath);

  //       // Navigate to the Post screen with the extracted post path
  //       navigation.navigate("Post", { postID });
  //     }
  //   };

  //   Linking.addEventListener("url", handleDeepLink);

  //   return () => Linking.removeEventListener("url", handleDeepLink);
  // }, []);

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <BottomTab />
      </ThemeProvider>
    </NavigationContainer>
  );
}
