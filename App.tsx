import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import Component from "./components/MyComponent";
import BottomTab from "./Stacks/BottomTab";
import { NavigationContainer } from "@react-navigation/native";

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

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <BottomTab />
      </ThemeProvider>
    </NavigationContainer>
  );
}
