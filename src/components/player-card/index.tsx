import { ButtonIcon } from "@components/button-icon";
import { Container, Icon, Name } from "./styles";

interface PlayerCardProps {
  name: string;
  onRemove: () => void
}

export function PlayerCard({name, onRemove}: PlayerCardProps){
  return(
    <Container>
      <Icon name="person" />
      <Name>{name}</Name>

      <ButtonIcon
        icon="close"
        type="secondary"
        onPress={onRemove}
      />
    </Container>
  )
}