import AsyncStorage from '@react-native-async-storage/async-storage';
// for testing purpose
class asyncStorageService {
  constructor() {}
  storeData = async (key: string, value: string | object | number) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };
  getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        return JSON.parse(value);
      }
      return null;
    } catch (e) {
      return null;
      // error reading value
    }
  };
  clearAll = async (onCleared: () => void, onError: () => void) => {
    try {
      await AsyncStorage.clear();
      onCleared();
    } catch (e) {
      onError();
    }
  };
}
const asyncStorage = new asyncStorageService();
export default asyncStorage;
