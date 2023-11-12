import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@rneui/themed";
import {
  getItemFromAsyncStorage,
  removeItemFromAsyncStorage,
  setItemToAsyncStorage,
} from "../lib/AsyncStorage";
import { useNavigation } from "@react-navigation/native";

const MyForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  // const [image, setImage] = useState("");

  const navigation = useNavigation();
  const { theme } = useTheme();
  const handleSubmit = async () => {
    // Handle form submission logic
    if (fullName === "" || email === "") {
      alert("Please enter your details");
      return;
    }
    await setItemToAsyncStorage("fullName", fullName);
    await setItemToAsyncStorage("email", email);
    navigation.navigate("MainHome");
  };

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

  // const handleImage = async () => {};

  return (
    <View style={styles.container}>
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )} */}
      <View style={{ marginTop: 54, marginBottom: 24 }}>
        <Text
          style={{
            fontSize: 54,
            fontWeight: "900",
            color: theme.colors.primary,
          }}
        >
          Hello !!
        </Text>

        <Text style={{ fontSize: 32, color: theme.colors.grey2 }}>
          Please enter your details to get started
        </Text>
      </View>
      <View style={{ marginTop: 32 }}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 32,
            height: 40,
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Get Started </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 54,
    borderColor: "gray",
    fontSize: 18,
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 16,
  },
});

export default MyForm;
