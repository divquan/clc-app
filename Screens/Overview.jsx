import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { getItemFromAsyncStorage } from "../lib/AsyncStorage";
import { useNavigation } from "@react-navigation/native";

const Overview = () => {
  const { width, height } = useWindowDimensions();
  const [fullName, setFullName] = React.useState("");
  const { theme } = useTheme();
  useEffect(() => {
    const getComponentData = async () => {
      try {
        const fullName = await getItemFromAsyncStorage("fullName");
        setFullName(fullName);
      } catch (e) {}
    };
    getComponentData();
  }, []);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View>
        <StatusBar backgroundColor="" />
        <View
          style={{
            paddingTop: 54,
            paddingHorizontal: 20,
            position: "relative",
            backgroundColor: theme.colors.primary,
            height: 340,
            borderBottomEndRadius: 30,
            borderBottomLeftRadius: 30,
          }}
        >
          <View>
            <Text style={{ fontSize: 43, fontWeight: "900", color: "white" }}>
              {"Welcome " + fullName.split(" ")[0] + "!"}
            </Text>
            <Text style={{ fontSize: 16, color: theme.colors.grey1 }}>
              {"What have you read today?"}
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              top: "50%",

              left: "50%",
              transform: [
                { translateX: -width * 0.8 * 0.5 },
                { translateY: 40 },
              ],
            }}
          >
            <Text
              style={{
                color: "yellow",
                fontSize: 22,
                marginBottom: 6,
                marginLeft: 6,
              }}
            >
              Today, 12 November 23
            </Text>
            <ReadCard theme={theme} width={width} />
          </View>
        </View>
        <View style={{ marginTop: 100 }}>
          <TodayReadCard width={width} theme={theme} />
          <LatestPostCard width={width} theme={theme} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Overview;

const styles = StyleSheet.create({});

const ReadCard = ({ width, theme }) => {
  return (
    <View
      style={{
        height: 200,
        width: width - 40,
        shadowColor: theme.colors.black,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        borderWidth: 2,
        borderColor: theme.colors.grey5,
        borderStyle: "solid",
        backgroundColor: theme.colors.grey5,
        borderRadius: 10,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        position: "relative",
      }}
    >
      <View style={{ position: "relative", width: "50%" }}>
        <Text
          style={{ fontSize: 28, marginTop: 14, color: theme.colors.grey1 }}
          lineBreakMode="middle"
          numberOfLines={1}
        >
          Posts is not working
        </Text>
        <Image
          style={{
            width: 120,
            height: 160,
            borderRadius: 10,
            position: "absolute",
            left: 13,
            bottom: -40,
            backgroundColor: theme.colors.grey5,
          }}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </View>
      <View
        style={{
          // marginLeft: 42,
          flex: 1,
          width: "50%",
          display: "flex",
          justifyContent: "center",
          //   alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 16, fontWeight: "700", color: theme.colors.grey1 }}
        >
          Last read
        </Text>
        <Text style={{ color: theme.colors.grey2 }}>Monday, 24 January</Text>
        <TouchableOpacity s>
          <Text style={{ color: theme.colors.primary, marginTop: 12 }}>
            Continue to read...
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TodayReadCard = ({ width, theme }) => {
  return (
    <View
      style={{
        marginTop: 45,
        backgroundColor: theme.colors.grey5,
        display: "flex",
        padding: 24,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: width - 40,
        marginHorizontal: 20,
      }}
    >
      <Text
        style={{ fontSize: 16, fontWeight: "600", color: theme.colors.grey0 }}
      >
        You have read 3 articles today
      </Text>
    </View>
  );
};

const LatestPostCard = ({ width, theme }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{ width: width - 40, marginHorizontal: 20, marginVertical: 40 }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: theme.colors.grey1,
          }}
        >
          Latest Post
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Bookmark", { screen: "All Posts" })
          }
        >
          <Text style={{ fontSize: 16, color: theme.colors.grey2 }}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "100%",
              height: 200,
              backgroundColor: theme.colors.grey5,
              borderRadius: 10,
              position: "relative",
            }}
          >
            <Image
              style={{
                width: "100%",
                height: 200,
                borderRadius: 10,
              }}
              source={{
                uri: "https://reactnative.dev/img/tiny_logo.png",
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 12,
                paddingHorizontal: 5,
                paddingVertical: 3,
                backgroundColor: theme.colors.primary,
                borderTopRightRadius: 8,
                // borderBottomRightRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  fontWeight: "700",
                }}
              >
                Post title
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
