// components/UserCard.tsx
import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { UserCardProps } from "@/type";
import Ionicons from "@expo/vector-icons/Ionicons";

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const router = useRouter();

  const handleOpenWebsite = () => {
    Linking.openURL(`https://${user.website}`);
  };

  return (
    <View className="py-6 px-4 mb-4 bg-white rounded-lg shadow mx-3">
      {/* User Name and Contact Info */}
      <View className="flex items-center flex-row justify-between">
        <Text
          className="text-xl font-JakartaBold"
          style={{
            width: "60%", // Limit width to 50% of container
          }}
          numberOfLines={2} // Ensures long names wrap to the next line
        >
          {user.name}
        </Text>
        <View className="flex flex-col bg-green-600 px-3 py-1 rounded-2xl">
          <Text className="text-sm font-JakartaSemiBold text-white">
            {user.address.city}
          </Text>
        </View>
      </View>
      <View className="flex items-center flex-row gap-1">
        <Ionicons name="mail" size={15} color="gray" />
        <Text className="text-base mb-1 font-JakartaMedium text-gray-700">
          {user.email}
        </Text>
      </View>
      <View className="flex items-center flex-row gap-1 mb-2">
        <Ionicons name="call" size={15} color="gray" />

        <Text className="text-base font-JakartaMedium">{user.phone}</Text>
      </View>

      {/* Address */}

      <View className="flex items-center flex-row gap-1 w-[90%] mb-2">
        <Ionicons name="location-outline" size={15} color="gray" />
        <Text className="text-md text-gray-700 mb-1 font-JakartaSemiBold w-full flex-wrap">
          {user.address.street}, {user.address.suite}, {user.address.zipcode}
        </Text>
      </View>
      <View className="flex items-center flex-row gap-1 w-[90%] mb-2">
        <Ionicons name="bag-sharp" size={15} color="gray" />
        <Text className="text-md text-gray-700 mb-1 font-JakartaSemiBold w-full flex-wrap">
          {user.company.name}
        </Text>
      </View>
      {/* Website Button */}
      <TouchableOpacity className="bg-green-600 p-2 rounded">
        <Text
          onPress={() =>
            router.push({
              pathname: `./user/${user.id}/posts`,
              params: {
                name: user.name,
                website: user.website,
                email: user.email,
                phone: user.phone,
              },
            })
          }
          className="text-white text-center font-JakartaSemiBold"
        >
          View Posts
        </Text>
      </TouchableOpacity>

      {/* Navigate to User Posts */}
      <TouchableOpacity
        className="bg-gray-100 p-2 rounded mt-2"
        onPress={handleOpenWebsite}
      >
        <Text className="text-center text-gray-800 font-JakartaSemiBold">
          Visit Website{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserCard;
