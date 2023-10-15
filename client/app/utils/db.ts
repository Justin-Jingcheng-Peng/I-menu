import { FIREBASE_DB } from "../../FirebaseConfig";
import {
  doc,
  getDocs,
  getDoc,
  query,
  where,
  collection,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { User } from "../types";
import "react-native-get-random-values";

// A function that adds a new cheerer to a session being referred to

export const getUserById = async (uid: string) => {
  try {
    const db = FIREBASE_DB;
    const userRef = doc(db, "users", uid);

    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const user: User = {
        uid: userData.uid,
        email: userData.email,
        username: userData.username,
        Ingredients: userData.Ingredients,
        medicalHistories: userData.medicalHistories,
        height: userData.height,
        weight: userData.weight,
        religion: userData.religion,
        age: userData.age,
        gender: userData.gender,
      };
      return user;
    } else {
      console.log("User data not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getUserByEmail = async (userEmail: string) => {
  try {
    const db = FIREBASE_DB;
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", userEmail));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const user: User = {
        uid: userData.uid,
        email: userData.email,
        username: userData.username,
        Ingredients: userData.Ingredients,
        medicalHistories: userData.medicalHistories,
        height: userData.height,
        weight: userData.weight,
        religion: userData.religion,
        age: userData.age,
        gender: userData.gender,
      };
      return user;
    } else {
      console.log("User data not found for the provided email.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data by email:", error);
    throw error;
  }
};

type UserFields = Partial<User>;
export const updateUserFields = async (fields: UserFields): Promise<void> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.log("No user is logged in");
      return;
    }

    // Check if the user is in session
    const userRef = doc(FIREBASE_DB, "users", user.uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      // Update the fields for the user
      await updateDoc(userRef, fields);
    } else {
      console.log("User not found in Firestore.");
    }
  } catch (error) {
    console.error("Error updating user fields:", error);
  }
};

// Two functions below will be replaced

export const uriToBlob = (uri: any) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error("uriToBlob failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);

    xhr.send(null);
  });
};
export async function handleUpload(
  uri: string,
  navigation?: any,
  setLoading?: (value: boolean) => void
) {
  const auth = getAuth();
  const user = auth.currentUser;
  const theBlob = await uriToBlob(uri);
  const imageRef = ref(getStorage(), `images/${user?.uid}.png`);
  const uploadTask = uploadBytesResumable(imageRef, theBlob as any);

  if (!user) {
    console.log("No user is logged in");
    return;
  }
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // ...existing code for state change events
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    async () => {
      // Added async here
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);

        // Update the user's profilePicture field with the reference to the uploaded image
        const userDocRef = doc(FIREBASE_DB, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          await updateDoc(userDocRef, {
            profilePicture: downloadURL,
          });
        } else {
          console.log("User document does not exist");
        }
        if (setLoading) {
          setLoading(false);
        }
        if (navigation) {
          navigation.goBack();
        }
      } catch (error) {
        console.error(
          "Error while uploading and updating profile picture:",
          error
        );
      }
    }
  );
}

export async function doesUsernameExist(username: string) {
  try {
    const usersCollection = collection(FIREBASE_DB, "users");
    const q = query(usersCollection, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching username:", error);
    throw error;
  }
}
