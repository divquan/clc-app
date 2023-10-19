import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "@rneui/themed";
import { color } from "@rneui/base";
import { getFormattedDate } from "../lib/helperfunctions";

// const FeatureCard = ({ imgUrl, category, heading, excerpt }) => {
// //   const { backgroundColor, textColor } = useContext(ThemeContext);

//   return (
//     <View style={[styles.container, { backgroundColor }]}>
//       <Image
//         style={styles.image}
//         source={{
//           uri: imgUrl,
//         }}

//         // source={require("../assets/png/logo-no-background.png")}
//       />
//       <GreyTxt content={category} style={styles.category} />
//       {/* <Txt content={heading} style={styles.heading} /> */}
//       <Txt
//         style={styles.heading}
//         lines={1}
//         content={`${heading}: ${excerpt}`}
//       />

//       <View style={styles.dateContainer}>
//         <Ionicons name="time-outline" size={12} color={textColor} />
//         <GreyTxt
//           style={styles.date}
//           content={getFormattedDate("2023-01-10T21:38:33")}
//         />
//       </View>
//     </View>
//   );
// };

const PostCard = ({
  id,
  imgUrl,
  category,
  title,
  excerpt,
  date,
  navigation,
  content,
  onPressFn,
}: {
  id: string;
  imgUrl: string;
  category: string | null;
  title: string;
  excerpt: string[];
  date: string;
  navigation?: string;
  content: string[];
  onPressFn: () => void;
}) => {
  const { theme } = useTheme();
  return (
    <View>
      <View
        key={id}
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background,
            flexDirection: "row",
          },
        ]}
      >
        <TouchableOpacity onPress={onPressFn}>
          <Image
            style={[styles.image, { width: 100, height: 100 }]}
            source={{
              uri: imgUrl,
            }}
          />
        </TouchableOpacity>
        <View
          style={{ flex: 1, marginLeft: 5, justifyContent: "space-between" }}
        >
          <Text style={{ color: theme.colors.grey3, marginLeft: 5 }}>
            {category}
          </Text>
          <TouchableOpacity onPress={onPressFn}>
            <Text
              style={{
                color: theme.colors.grey0,
                fontWeight: "700",
                fontSize: 15,
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              //   onPress={onPress}
              numberOfLines={2}
              ellipsizeMode="head"
              style={[
                styles.heading,
                { color: theme.colors.black, fontSize: 14 },
              ]}
            >
              {`${excerpt}`}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={onPressFn}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="time-outline"
                  size={13}
                  color={theme.colors.grey3}
                  style={{ marginRight: 3 }}
                />

                <Text style={{ color: theme.colors.grey2 }}>
                  {getFormattedDate(date)}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={14}
                color={theme.colors.grey0}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,

    // borderBottomWidth: 1,
    // borderColor: "#E0E0E0",
  },
  image: {
    borderRadius: 12,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  category: {
    fontSize: 12,
    marginTop: 4,
  },
  heading: {
    fontSize: 16,
    marginTop: 4,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 2,
    marginTop: 2,
    width: "100%",
  },
  date: {
    marginLeft: 4,
    fontSize: 11,
  },
});

export { PostCard };
