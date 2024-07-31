import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storage-config";
import { getAllGroups } from "./get-all-groups";

export async function removeGroupByName(groupNameDeleted: string) {
  try {
    const storageGroups = await getAllGroups();
    const groups = storageGroups.filter((group) => group !== groupNameDeleted);

    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupNameDeleted}`);
    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
  } catch (error) {
    throw error;
  }
}
