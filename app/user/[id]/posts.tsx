import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios, { AxiosError } from "axios";
import { capitalizeFirstLetter } from "../../../utils/helper";
import { Ionicons } from "@expo/vector-icons";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const UserPosts: React.FC = () => {
  const { name, email, phone, website } = useLocalSearchParams();

  const { id } = useLocalSearchParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (limit: number, page: number) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${id}&_limit=${limit}&_page=${page}`
      );

      if (response.data.length === 0) {
        setAllDataFetched(true); // No more posts
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
      }
    } catch (err) {
      const error = err as AxiosError; // Type assertion

      // Handle 500 Internal Server Error
      if (error.response && error.response.status === 500) {
        setError("Internal Server Error. Please try again later.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts(5, 1); // Fetch the first 5 posts initially
  }, []);

  const loadMorePosts = () => {
    if (!loading && !loadingMore && !allDataFetched) {
      setLoadingMore(true);
      const nextPage = Math.ceil(posts.length / 5) + 1; // Calculate the next page based on current posts length
      fetchPosts(5, nextPage);
    }
  };

  const renderItem = ({ item }: { item: Post }) => (
    <View className="p-4 mb-4 bg-white rounded-lg shadow-md">
      <Text className="text-xl font-bold mb-2 text-green-600 font-JakartaBold">
        {capitalizeFirstLetter(item.title)}
      </Text>
      <Text className="text-base text-gray-800 font-JakartaMedium">
        {capitalizeFirstLetter(item.body)}
      </Text>
    </View>
  );
  const renderHeader = () => (
    <View className="bg-white p-4 shadow-sm mb-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-xl font-bold mb-0">{name} Posts</Text>
        <View className="flex flex-row items-center gap-1">
          <Ionicons name="mail" size={15} color="gray" />
          <Text className="text-md font-JakartaSemiBold text-gray-600 flex items-center">
            {email}
          </Text>
        </View>
      </View>
      <View className="flex flex-row justify-between mt-1">
        <View className="flex flex-row items-center gap-1">
          <Ionicons name="link" size={15} color="gray" />
          <Text className="text-md font-JakartaSemiBold text-gray-600 flex items-center">
            {website}
          </Text>
        </View>
        <View className="flex flex-row items-center gap-1">
          <Ionicons name="call" size={15} color="gray" />

          <Text className="text-md font-JakartaSemiBold text-gray-600">
            {phone}
          </Text>
        </View>
      </View>
    </View>
  );
  if (loading && posts.length === 0) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <SafeAreaView className="bg-gray-100 flex-1">
      <FlatList
        className="m-4"
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={renderHeader} // Render the header
        stickyHeaderIndices={[0]} // Make the header sticky
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : allDataFetched ? (
            <Text className="text-center text-lg font-JakartaBold text-red-700 pb-10">
              --- No more posts ---
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default UserPosts;
