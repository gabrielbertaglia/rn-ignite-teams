import { Button } from "@components/button";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Input } from "@components/input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Container, Content, Icon } from "./styles";

export function NewGroup(){
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  function handleCreateNewGroup(){
    navigation.navigate('players', {group})
  }

  return(
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie uma nova turma para você e seus amigos"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
        />

        <Button
        style={{
          marginTop: 20
        }}
        onPress={handleCreateNewGroup}
        >
          Criar
        </Button>
      </Content>
    </Container>
  )
}