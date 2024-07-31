import { Button } from "@components/button";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Input } from "@components/input";
import { useNavigation } from "@react-navigation/native";
import { createGroup } from "@storage/group/create-group";
import { AppError } from "@utils/app-error";
import { useState } from "react";
import { Alert } from "react-native";
import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [group, setGroup] = useState("");

  const navigation = useNavigation();

  const isDisabled = group.trim().length === 0;

  async function handleCreateNewGroup() {
    try {
      await createGroup(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo turma", error.message);
        return;
      }
      Alert.alert("Novo turma", "Não foi possível criar um novo turma");
      console.log(error);
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie uma nova turma para você e seus amigos"
        />

        <Input placeholder="Nome da turma" onChangeText={setGroup} />

        <Button
          disabled={isDisabled}
          style={[
            {
              marginTop: 20,
            },
            isDisabled && { opacity: 0.6 },
          ]}
          onPress={handleCreateNewGroup}
        >
          Criar
        </Button>
      </Content>
    </Container>
  );
}
