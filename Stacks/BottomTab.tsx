import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Settings } from "../Screens";
import { HomeStack } from "../Stacks";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import MyComponent from "../components/MyComponent";
import { useTheme } from "@rneui/themed";
import { Route, getFocusedRouteNameFromRoute } from "@react-navigation/native";
const Tab = createBottomTabNavigator();

function MyTabs() {
  const { theme, updateTheme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeStack") {
            iconName = focused ? "home" : "home-outline";
            size = focused ? 30 : 28;
          } else if (route.name === "Explore") {
            iconName = focused ? "compass" : "compass-outline";
            size = focused ? 30 : 28;
          } else if (route.name === "Bookmark") {
            iconName = focused ? "bookmark" : "bookmark-outline";
            size = focused ? 30 : 28;
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
            size = focused ? 30 : 28;
          }
          return <Ionicons name={`${iconName}`} size={size} color={color} />;
        },
        tabBarLabelStyle: { fontSize: 13 },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarStyle: {
          paddingTop: 4,
          display: getRouteName(route) ? "flex" : "none",
          paddingBottom: 8,
          height: 60,
          backgroundColor: theme.colors.background,
        },
        tabBarButton: (props) => <TouchableOpacity {...props} />,
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={({ route }) => ({
          // Use tabBarVisible to hide the tab bar in specific screens
          headerShown: false,
        })}
      />
      <Tab.Screen name="Explore" component={Home} />
      <Tab.Screen name="Bookmark" component={Home} />
      <Tab.Screen name="Profile" component={MyComponent} />
    </Tab.Navigator>
  );
}
export default MyTabs;

const showHeader = (route: Partial<Route<string>>) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName?.includes("PostDetail") ||
    routeName?.includes("CommentScreen")
  ) {
    return false;
  } else {
    return true;
  }
};

const getRouteName = (route: Partial<Route<string>>) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName?.includes("PostPage") || routeName?.includes("comment")) {
    return false;
  } else {
    return true;
  }
};
