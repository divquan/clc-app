import { View, Text } from "react-native";
import React from "react";

const Comment = () => {
  return (
    <View>
      <Text>Comment</Text>
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
