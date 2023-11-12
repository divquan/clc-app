import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Onboarding, Overview, Settings } from "../Screens";
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

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Bookmark") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "person" : "person-outline";
            size = focused ? 30 : 28;
          } else if (route.name === "Overview") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={`${iconName}`} size={28} color={color} />;
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
        name="Home"
        component={Overview}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Search" component={Home} />
      <Tab.Screen
        name="Bookmark"
        component={HomeStack}
        options={({ route }) => ({
          // Use tabBarVisible to hide the tab bar in specific screens
          headerShown: false,
        })}
      />
      <Tab.Screen name="Settings" component={Settings} />
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
