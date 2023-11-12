import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  FlatList,
} from "react-native";
import { addCommentToPost, fetchComments, fetchPost } from "../lib/api.request";
import { ScrollView } from "react-native";
import { useTheme } from "@rneui/themed";
import { extractPTagContents, getFormattedDate } from "../lib/helperfunctions";
import Logo from "../components/Logo";
import Icon from "react-native-vector-icons/Ionicons";

const Comment = ({ navigation, route }) => {
  const { postID } = route.params;

  const { theme } = useTheme();
  const [comments, setComments] = useState([]);
  // const comments = [
  //   { id: "1", username: "User1", comment: "This is the first comment." },
  //   { id: "2", username: "User2", comment: "Great post!" },
  //   // Add more comments as needed
  // ];
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Comments",
      headerStyle: {
        backgroundColor: theme.colors.background, // Customize the background
      },
      headerTintColor: theme.colors.black, // Set the color of the back button and header text
    });
  }, [navigation]);

  function findElementsByProperty(array, propertyName, propertyValue) {
    return array.filter((element) => element[propertyName] === propertyValue);
  }

  useEffect(() => {
    fetchComments(postID)
      .then((res) => {
        setComments(res);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Comment input */}
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          marginBottom: 5,
          paddingHorizontal: 7,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderRadis: 8, padding: 8 }}
          placeholder="Add a comment..."
        />
        <TouchableOpacity
          style={{
            marginLeft: 8,
            backgroundColor: "blue",
            borderRadius: 8,
            padding: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={async () => {
            console.log(postID);
            try {
              await addCommentToPost(postID, {
                name: "Divine",
                email: "divquan@gmail.com",
                content: "This is a comment",
                parent: 0,
              });
              ToastAndroid.show("Comment posted!", ToastAndroid.SHORT);
            } catch (er) {
              ToastAndroid.show(
                "Could not add comment: " + er.message,
                ToastAndroid.SHORT
              );
            }
          }}
        >
          <Text style={{ color: "white" }}>Post</Text>
        </TouchableOpacity>
      </View>
      {/* Comment list */}
      {comments.length === 0 ? (
        <Text>No comment added</Text>
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const res = findElementsByProperty(comments, "parent", item.id);
            if (item.parent !== 0) return null;
            return (
              <View style={{ marginBottom: 16 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 0,
                  }}
                >
                  <Image
                    source={{ uri: item.author_avatar_urls["24"] }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginRight: 10,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        marginBottom: 4,
                      }}
                    >
                      {item.author_name}
                    </Text>
                    <Text
                      style={{
                        color: "gray",
                        marginBottom: 4,
                      }}
                    >
                      {getFormattedDate(item.date)}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                      {item.content.rendered}
                    </Text>
                  </View>
                </View>
                {!!res && res.length > 0
                  ? res.map((item, index) => {
                      return (
                        <>
                          <Text style={{ marginLeft: 40, marginBottom: 12 }}>
                            Replies
                          </Text>
                          <View
                            key={index}
                            style={{
                              flexDirection: "row",
                              marginBottom: 16,
                              marginLeft: 40,
                            }}
                          >
                            <Image
                              source={{ uri: item.author_avatar_urls["24"] }}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                marginRight: 10,
                              }}
                            />
                            <View style={{ flex: 1 }}>
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  marginBottom: 4,
                                }}
                              >
                                {item.author_name}
                              </Text>
                              <Text
                                style={{
                                  color: "gray",
                                  marginBottom: 4,
                                }}
                              >
                                {getFormattedDate(item.date)}
                              </Text>
                              <Text style={{ fontSize: 16 }}>
                                {item.content.rendered}
                              </Text>
                            </View>
                          </View>
                        </>
                      );
                    })
                  : null}
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Comment;

/* <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
            Comments
          </Text>
          {commentIsLoading ? (
            <ActivityIndicator />
          ) : commentsData.length === 0 ? (
            <Text>No comment added</Text>
          ) : (
            commentsData.map((comment) => {
              if (comment.parent !== 0) return null;

              return (
                <View key={comment.id}>
                  <Text>{comment.author_name}</Text>
                  <Text>{comment.content.rendered}</Text>
                  {comment.children && comment.children.length > 0 && (
                    <View>{renderComments(comment.children)}</View>
                  )}
                </View>
              );
            })
          )}
        </View> */
