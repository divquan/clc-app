import { View, Text, ScrollView, RefreshControl, FlatList } from "react-native";
import React, { useState } from "react";
import { PostCard } from "../components/Card1";
import { useTheme } from "@rneui/themed";
import useSWR from "swr";
import { fetchPosts } from "../lib/api.request";
//@ts-ignore
import he from "he";
import { extractPTagContents, removePTags } from "../lib/helperfunctions";
import { hardCategories } from "../lib/data";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type HomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};
const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useTheme();
  const pages = 10;
  const { data, error, mutate, isLoading } = useSWR(`${pages}`, fetchPosts, {
    revalidateOnFocus: true,
  });

  const onRefresh = React.useCallback(async () => {
    try {
      // Set refreshing to true
      setRefreshing(true);

      // Refetch data
      await mutate(pages);
    } catch (error) {
      console.error("Error fetching latest posts:", error);
    } finally {
      // Set refreshing to false after the refresh action is complete
      setRefreshing(false);
    }
  }, [mutate, pages]);

  const renderItem = ({ item }: { item: any }) => {
    item.title.rendered = he.decode(item.title.rendered);
    const decodeExcerpt = he.decode(item.excerpt.rendered);
    const excerpt = removePTags(decodeExcerpt);
    const content = extractPTagContents(item.content.rendered);
    // const decodeContent = he.decode(content);
    const getCategoryNameById = (
      categories: { id: number; name: string }[],
      categoryIdToFind: number
    ) => {
      const category = categories.find((item) => item.id === categoryIdToFind);
      return category ? category.name : null;
    };
    const cat = getCategoryNameById(hardCategories, item.categories[0]);
    return (
      <PostCard
        // navigation={navigation}
        key={item.id}
        id={item.id}
        date={item.date}
        category={cat} // Replace with the actual category property
        title={item.title.rendered}
        imgUrl={item.jetpack_featured_media_url}
        excerpt={excerpt} // Replace with the actual excerpt property
        content={content}
        onPress={() => {
          console.log("yyyyyyyy");
          navigation.navigate("PostDetail");
        }}
      />
    );
  };

  if (isLoading || refreshing) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;

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
