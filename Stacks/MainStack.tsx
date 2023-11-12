import { createStackNavigator } from "@react-navigation/stack";
import { Login, Onboarding } from "../Screens";
import BottomTab from "./BottomTab";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function MyStack() {
  const [onboarded, setOnboarded] = useState(false);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const checkOnboarding = async () => {
    const onboarded = await AsyncStorage.getItem("onboarding");
    if (onboarded === "true") {
      setOnboarded(true);
    } else {
      setOnboarded(false);
    }
  };
  const checkUser = async () => {
    setLoading(true);
    try {
      const fullname = await AsyncStorage.getItem("fullName");
      const email = await AsyncStorage.getItem("email");
      if (email && fullname) {
        setUser(true);
      } else {
        setUser(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
    checkUser();
  }, []);

  if (loading) {
    return null;
  }
  return (
    <Stack.Navigator initialRouteName="">
      {!onboarded && (
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
      )}
      {!user && (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="MainHome"
        component={BottomTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
