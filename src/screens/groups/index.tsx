import { Button } from "@components/button";
import { GroupCard } from "@components/group-card";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { ListEmpty } from "@components/list-empty";
import { useNavigation } from "@react-navigation/native";
import UsersThree from "phosphor-react-native/src/icons/UsersThree";
import { useState } from "react";
import { FlatList } from "react-native";
import theme from "src/theme";
import { Container, } from "./styles";

interface GroupsProps {
  name: string
  id: string
}

export function Groups(){
  const [groups, setGroups] = useState<GroupsProps[]>([])

  const navigation = useNavigation()

  function handleNewGroup(){
    navigation.navigate('new-group')
  }

  return(
    <Container>
      <Header />
      <Highlight
        title="Turmas"
        subtitle="jogue com a sua turma"
      />

      <FlatList
        data={groups}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <GroupCard.Root>
            <GroupCard.Icon icon={UsersThree} weight="fill" color={theme.COLORS.GREEN_700} />
            <GroupCard.Title title={item.name} />
          </GroupCard.Root>
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty
            message="Que tal cadastrar a primeira turma?"
          />
        )}
      />

      <Button
        onPress={handleNewGroup}
      >
        Criar nova turma
      </Button>
    </Container>
  )
}
