import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useContext, useEffect, useState } from "react";
//   import CommentBar from "../components/CommentBar";
//   import PostDetailHeader from "../components/PostDetailHeader";
//   import { fetchCommentsApi } from "../api/api";
//   import { GreyTxt, Txt, getFormattedDate } from "../helper";
  import Icon from "react-native-vector-icons/Ionicons";
  
  const PostDetail = ({ route, navigation }) => {
    const { id, title, content, date, category, imgUrl } = route.params;
    
    // const { addToBookmark, isBookmarked, clearBookmarks, removeBookmark } =
    //   useContext(Context);
    // const [bookmark, setBookmark] = useState(false);
    // const checkBookmark = async () => {
    //   const bool = await isBookmarked(route.params.id);
    //   console.log(bool);
    //   setBookmark(bool);
    //   return bool;
    // };
    // checkBookmark();
    return (

      <View
        style={{
        //   backgroundColor,
          position: "relative",
        }}
      >
        <ScrollView>
          {/* <PostDetailHeader showShare={true} navigation={navigation} /> */}
          <View style={styles.container}>
            <Image style={styles.image} source={{ uri: `${imgUrl}` }} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              < content={category} style={styles.category} ></
              <GreyTxt content={getFormattedDate(date)} style={styles.date} />
            </View>
            <Txt style={styles.topic} content={title}></Txt>
            <View style={{ marginTop: 20 }}>
              {content.map((p, index) => {
                if (p) {
                  return (
                    <View key={`${index}text${p.slice(5, 7)}`}>
                      <Txt style={{ fontSize: 15 }} content={p} />
                      <View
                        key={`sapce${p.slice(5, 7)}`}
                        style={{ height: 8 }}
                      ></View>
                    </View>
                  );
                }
              })}
            </View>
          </View>
        </ScrollView>
        {/*how do I make this fixed at the bottom of the screen regardless of the scrolling */}
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20, // Add padding for the icons
              backgroundColor: backgroundColor, // Match the background color
              height: 60, // Adjust the height as needed;]\\\
            }}
          >
            <TouchableOpacity>
              <Icon name="chatbox-outline" size={24} color={negativeColor} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                bookmark
                  ? removeBookmark(route.params.id)
                  : addToBookmark(route.params);
                setBookmark(!bookmark);
              }}
            >
              <Icon
                name={bookmark ? "bookmark" : "bookmark-outline"}
                size={24}
                color={bookmark ? accentColor : negativeColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  export default PostDetail;
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: 15,
      paddingTop: 0,
    },
    // header: {},
    image: {
      borderRadius: 7,
      width: "100%",
      height: 200,
      backgroundColor: "grey",
    },
    topic: {
      fontSize: 22,
      fontWeight: "bold",
    },
    content: {
      fontSize: 17,
      marginBottom: 12,
      color: "#4E4B66",
      lineHeight: 24,
    },
    bottomNav: {},
  });
  