import React, { useState } from "react";
import { View } from "react-native";
import { handleUpload } from "../utils/db";
import LongButton from "../components/LongButton";
import ChangeUserInfoBackground from "../components/wrapper/ChangeUserInfoBackground";
import { takePicture } from "../utils/imagePickerHelpers";
import { Image, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { Text } from "react-native";

export default function Test() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const handleTakePicture = async () => {
    const imageUri = await takePicture();
    if (imageUri) {
      setSelectedImg(imageUri);
    }
  };
  const currentUserRedux = useSelector(
    (state: any) => state.currentUser.currentUser
  );
  const uploadImage = async (img: string) => {
    if (img) {
      await handleUpload(img);
      await fetchData();
    }
  };
  const [paragraph, setParagraph] = useState("");
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://attempt3-5f2c12615e25.herokuapp.com/process-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: currentUserRedux?.username,
            religion: currentUserRedux?.religion,
            medicalHistories: currentUserRedux?.medicalHistories,
            allergies: currentUserRedux?.Ingredients,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      setParagraph(responseData.result);
    } catch (error) {}
  };

  return (
    <View style={{ flex: 1 }}>
      <ChangeUserInfoBackground showGoBack={false}>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center", // Center children horizontally
          }}
        >
          {/* Wrap your content with ScrollView */}
          {selectedImg && (
            <Image
              source={{ uri: selectedImg }}
              style={{ width: 200, height: 200, marginVertical: 10 }} // Adjust dimensions as needed
            />
          )}
          <View
            style={{
              marginVertical: 10,
              width: 200,
            }}
          >
            <LongButton
              title="Take a picture"
              onPress={() => {
                handleTakePicture();
              }}
            />
          </View>
          <View style={{ marginVertical: 10, width: 200 }}>
            <LongButton
              title="Upload image"
              onPress={() => {
                if (selectedImg) {
                  uploadImage(selectedImg);
                } else {
                  fetchData();
                }
              }}
            />
          </View>
          <View style={{ marginVertical: 10, padding: 10 }}>
            <Text>{paragraph}</Text>
          </View>

          {/* End of ScrollView */}
        </ScrollView>
      </ChangeUserInfoBackground>
    </View>
  );
}
