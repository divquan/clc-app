import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Share,
} from "react-native";
import { fetchComments, fetchPost } from "../lib/api.request";
import { ScrollView } from "react-native";
import { useTheme } from "@rneui/themed";
import { extractPTagContents, showToast } from "../lib/helperfunctions";
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

        // Move onShare logic here
        const onShare = async () => {
          try {
            const result = await Share.share({
              message:
                res?.title?.rendered +
                ":" +
                "\n\n" +
                extractPTagContents(res?.content?.rendered)
                  ?.slice(1, 2)
                  .join("\n") +
                "..." +
                "\n\n" +
                "Read more at " +
                (res?.link || ""),
              link: res?.link,
              title: res?.title?.rendered,
            });

            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            console.log(error);
          }
        };
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
              <TouchableOpacity onPress={onShare}>
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
      })
      .catch((err) => {
        showToast("Something went wrong", ToastAndroid.LONG);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [route, navigation]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
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
            onPress={() => console.log("shared")}
          >
            <Text>Share</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 6,
          right: 0,
          flexDirection: "row",
          paddingHorizontal: 12,
          paddingVertical: 3,
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: theme.colors.grey5,
            padding: 8,
          }}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("comment", { postID })}
        >
          <Icon
            name="chatbox-ellipses-outline"
            size={32}
            color={theme.colors.grey1}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PostPage;
