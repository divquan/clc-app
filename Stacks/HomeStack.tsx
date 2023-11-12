import React from "react";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import Logo from "../components/Logo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../types";
import PostPage from "../Screens/PostPage";
import { Comment } from "../Screens";
import { useTheme } from "@rneui/themed";

const Homestack = createNativeStackNavigator();
type HomePageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};
const HomeStack: React.FC<HomePageProps> = () => {
  const { theme } = useTheme();
  return (
    <Homestack.Navigator>
      <Homestack.Screen
        name="All Posts"
        component={Home}
        options={{
          headerTitle: () => <Logo />,
          headerStyle: {
            backgroundColor: theme.colors.background, // Customize the background color
          },
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons
                color={theme.colors.grey2}
                name="notifications-outline"
                size={25}
              />
            </TouchableOpacity>
          ),
          headerTintColor: "#000", // Customize the text color
          headerTitleStyle: {
            fontWeight: "bold", // Customize the title text style
          },
        }}
      />
      <Homestack.Screen
        name="PostPage"
        component={PostPage}
        options={{ gestureEnabled: true }}
      />
      <Homestack.Screen
        name="comment"
        component={Comment}
        // options={{
        //   headerShown: false,
        //   headerTitle: "",
        //   headerRight: () => <Share />,
        // }}
      />
    </Homestack.Navigator>
  );
};

export default HomeStack;
