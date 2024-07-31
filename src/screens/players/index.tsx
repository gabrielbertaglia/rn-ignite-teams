import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";

import { Button } from "@components/button";
import { ButtonIcon } from "@components/button-icon";
import { Filter } from "@components/filter";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Input } from "@components/input";
import { ListEmpty } from "@components/list-empty";
import { Loading } from "@components/loading";
import { PlayerCard } from "@components/player-card";
import { removeGroupByName } from "@storage/group/remove-group-by-name";
import { addPlayerByGroup } from "@storage/player/add-player-by-group";
import { getPlayersByGroup } from "@storage/player/get-players-by-group";
import { getPlayersByGroupAndTeam } from "@storage/player/get-players-by-group-and-team";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { removePlayerByGroup } from "@storage/player/remove-player-by-group";
import { AppError } from "@utils/app-error";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

interface RoutePlayerParams {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();

  const route = useRoute();
  const { group } = route.params as RoutePlayerParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const trimPlayerName = newPlayerName.trim();

  const isDisabled = trimPlayerName.length === 0;

  async function handleAddPlayer() {
    if (isDisabled) {
      {
        return;
      }
    }
    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await addPlayerByGroup(newPlayer, group);
      const players = await getPlayersByGroup(group);
      setPlayers(players);
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName("");
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
        return;
      }
      console.log(error);
      Alert.alert("Nova pessoa", "Não foi possível adicionar");
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await getPlayersByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas filtradas do time selecionado"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemovePlayerByGroup(playerName: string) {
    try {
      await removePlayerByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover pessoa", "Não foi possível remover essa pessoa.");
    }
  }

  async function removeGroup() {
    try {
      await removeGroupByName(group);
      navigation.navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover turma", "Não foi possível remover o turma");
    }
  }

  async function handleRemoveGroupByName() {
    Alert.alert("Remove", "Você tem certeza que deseja remover esse turma?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => removeGroup() },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="adicione a galera e separe os times" />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        {!isDisabled && <ButtonIcon icon="add" onPress={handleAddPlayer} />}
      </Form>
      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayerByGroup(item.name)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time" />
          )}
          contentContainerStyle={[
            { paddingBottom: 50 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button variant="danger" onPress={handleRemoveGroupByName}>
        Remover turma
      </Button>
    </Container>
  );
}
