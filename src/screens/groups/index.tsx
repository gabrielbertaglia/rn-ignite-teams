import { Button } from "@components/button";
import { GroupCard } from "@components/group-card";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { ListEmpty } from "@components/list-empty";
import { Loading } from "@components/loading";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAllGroups } from "@storage/group/get-all-groups";
import UsersThree from "phosphor-react-native/src/icons/UsersThree";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import theme from "src/theme";
import { Container } from "./styles";

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new-group");
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await getAllGroups();
      setGroups(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard.Root onPress={() => handleOpenGroup(item)}>
              <GroupCard.Icon
                icon={UsersThree}
                weight="fill"
                color={theme.COLORS.GREEN_700}
              />
              <GroupCard.Title title={item} />
            </GroupCard.Root>
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
        />
      )}

      <Button onPress={handleNewGroup}>Criar nova turma</Button>
    </Container>
  );
}
