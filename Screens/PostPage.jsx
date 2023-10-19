import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { fetchComments, fetchPost } from "../lib/api.request";
import { ScrollView } from "react-native";
import { useTheme } from "@rneui/themed";
import { extractPTagContents } from "../lib/helperfunctions";
import Logo from "../components/Logo";
import Icon from "react-native-vector-icons/Ionicons";

const PostPage = ({ route, navigation }) => {
  const { postID } = route.params;
  const [data, setData] = useState({});
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { theme } = useTheme();

  useEffect(() => {
    fetchPost(postID)
      .then((res) => {
        setData(res);
        setContent(extractPTagContents(res?.content?.rendered));
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Use useLayoutEffect to set navigation options
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: {
        backgroundColor: theme.colors.background, // Customize the background
      },
      headerTintColor: theme.colors.black, // Set the color of the back button and header text

      headerRight: () => (
        <View
          style={{
            backgroundColor: theme.colors.background,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity>
            <Icon
              name="share-social-outline"
              size={24}
              color={theme.colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 12 }}>
            <Icon
              name="ellipsis-vertical-outline"
              size={24}
              color={theme.colors.black}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (!isLoading) {
    console.log("data");
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Post Image */}
      <Image
        source={{ uri: data?.jetpack_featured_media_url }}
        style={{ width: "100%", height: 200, resizeMode: "cover" }}
      />

      {/* Post Content */}
      <View style={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 8,
            color: theme.colors.grey1,
          }}
        >
          {data?.title?.rendered}
        </Text>

        {content.map((p, index) => {
          if (p) {
            return (
              <Text
                key={index}
                style={{
                  fontSize: 16,
                  color: theme.colors.grey2,
                  marginBottom: 4,
                }}
              >
                {p}
              </Text>
            );
          }
          return null;
        })}
      </View>

      {/* Icons (Bookmark and Share) */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          padding: 16,
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => console.log("Bookmark pressed")}
        >
          <Text>Bookmark</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => console.log("Share pressed")}
        >
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PostPage;
