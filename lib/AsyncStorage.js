import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to set an item to AsyncStorage
const setItemToAsyncStorage = async (key, value) => {
  value = JSON.stringify(value);
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Item with key ${key} set to AsyncStorage`);
  } catch (error) {
    console.error(
      `Error setting item with key ${key} to AsyncStorage: ${error}`
    );
  }
};

// Function to remove an item from AsyncStorage
const removeItemFromAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Item with key ${key} removed from AsyncStorage`);
  } catch (error) {
    console.error(
      `Error removing item with key ${key} from AsyncStorage: ${error}`
    );
  }
};

// Function to get an item from AsyncStorage
const getItemFromAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(`Item with key ${key} retrieved from AsyncStorage`);
      return value;
    } else {
      console.log(`Item with key ${key} not found in AsyncStorage`);
      return null;
    }
  } catch (error) {
    console.error(
      `Error getting item with key ${key} from AsyncStorage: ${error}`
    );
    return null;
  }
};

export {
  setItemToAsyncStorage,
  removeItemFromAsyncStorage,
  getItemFromAsyncStorage,
};
