import UserCard from "@/components/UserCard";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";

const Home = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [limit, setLimit] = useState(5);
  const [error, setError] = useState<string | null>(null);
  //  to track if all data is fetched-----------------
  const [allDataFetched, setAllDataFetched] = useState(false);

  const fetchData = async () => {
    // Adjust page for pagination ---------------------------------------
    let query = `?_limit=${limit}&_page=${Math.ceil(data.length / limit) + 1}`;
    try {
      setLoading(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users${query}`
      );

      if (response.data.length === 0) {
        // Set flag to true if no more data--------------------
        setAllDataFetched(true);
      } else {
        setData((prevData: any) => [...prevData, ...response.data]);
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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoadMore = () => {
    console.log("Loading more users...");
    if (!loading && !loadingMore && !allDataFetched) {
      // Check if loading more is false
      setLoadingMore(true); // Set loading more to true
      fetchData().finally(() => {
        setLoadingMore(false); // Reset loading more state after data is fetched
      });
    }
  };
  if (loading && data.length === 0) {
    return (
      <View className={"flex-1 justify-center items-center"}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className={"flex-1 justify-center items-center"}>
        <Text className={"text-red-500"}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        className="pt-10"
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator className="pb-10" size="large" color="#0000ff" />
          ) : allDataFetched ? (
            <Text className="text-center text-lg font-JakartaBold text-red-700 pb-10">
              --- No more users ---
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Home;
