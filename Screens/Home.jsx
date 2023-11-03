import { View, Text, ScrollView, RefreshControl, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { PostCard } from "../components/Card1";
import { useTheme } from "@rneui/themed";
import useSWR from "swr";
import { fetchLatestPosts, fetchPosts } from "../lib/api.request";
//@ts-ignore
import he from "he";
import { extractPTagContents, removePTags } from "../lib/helperfunctions";
import { hardCategories } from "../lib/data";
const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useTheme();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const onRefresh = React.useCallback(async () => {
    try {
      // Set refreshing to true
      setRefreshing(true);

      // Refetch data
      await fetchData();
    } catch (error) {
      console.error("Error fetching latest posts:", error);
    } finally {
      // Set refreshing to false after the refresh action is complete
      setRefreshing(false);
    }
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetchLatestPosts();
      setData(res);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    item.title.rendered = he.decode(item.title.rendered);
    const decodeExcerpt = he.decode(item.excerpt.rendered);
    const excerpt = removePTags(decodeExcerpt);
    const content = extractPTagContents(item.content.rendered);
    // const decodeContent = he.decode(content);
    const getCategoryNameById = (categories, categoryIdToFind) => {
      const category = categories.find((item) => item.id === categoryIdToFind);
      return category ? category.name : null;
    };
    const cat = getCategoryNameById(hardCategories, item.categories[0]);
    return (
      <PostCard
        key={item.id}
        id={item.id}
        date={item.date}
        category={cat} // Replace with the actual category property
        title={item.title.rendered}
        imgUrl={item.jetpack_featured_media_url}
        excerpt={excerpt} // Replace with the actual excerpt property
        content={content}
        onPressFn={() => {
          navigation.navigate("PostPage", { postID: item.id });
        }}
      />
    );
  };

  if (isLoading) return <Text>Loading...</Text>;

  return (
    // <ScrollView style={{ backgroundColor: theme.colors.background }}>
    //   <Text>Home</Text>
    //
    // </ScrollView>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
    />
  );
};

export default Home;
