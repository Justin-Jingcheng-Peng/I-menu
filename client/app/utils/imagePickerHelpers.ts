// imagePickerHelpers.ts

import * as ImagePicker from "expo-image-picker";

export const pickImageFromLibrary = async (): Promise<string | null> => {
  let permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access the media library is required!");
    return null;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.1,
    selectionLimit: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }

  return null;
};

export const takePicture = async (): Promise<string | null> => {
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access the camera is required!");
    return null;
  }

  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }

  return null;
};
