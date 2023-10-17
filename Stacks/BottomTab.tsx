import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Settings } from "../Screens";
import { HomeStack } from "../Stacks";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import MyComponent from "../components/MyComponent";
import { useTheme } from "@rneui/themed";
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
          paddingBottom: 8,
          height: 60,
          backgroundColor: theme.colors.background,
        },
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        // header: ({ navigation, route, options }) => {
        // //   const title = getHeaderTitle(options, route.name);

        //   return showHeader(route) ? (
        //     <Header title={title} style={options.headerStyle} />
        //   ) : null;
        // },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Explore" component={Home} />
      <Tab.Screen name="Bookmark" component={Home} />
      <Tab.Screen name="Profile" component={MyComponent} />
    </Tab.Navigator>
  );
}
export default MyTabs;
