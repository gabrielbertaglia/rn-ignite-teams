import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storage-config";
import { AppError } from "@utils/app-error";
import { getAllGroups } from "./get-all-groups";

export async function createGroup(newGroup: string) {
  try {
    const storageGroups = await getAllGroups();

    const groupAlreadyExists = storageGroups.includes(newGroup);

    if (groupAlreadyExists) {
      throw new AppError("Já existe uma turma cadastrado com esse nome.");
    }

    const storage = JSON.stringify([...storageGroups, newGroup]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
