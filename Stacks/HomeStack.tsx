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

const Homestack = createNativeStackNavigator();
type HomePageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};
const HomeStack: React.FC<HomePageProps> = () => {
  return (
    <Homestack.Navigator>
      <Homestack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <Logo />,
          headerStyle: {
            backgroundColor: "#fff", // Customize the background color
          },
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={25} />
            </TouchableOpacity>
          ),
          headerTintColor: "#fff", // Customize the text color
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
