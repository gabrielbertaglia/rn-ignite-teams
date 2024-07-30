import { Title } from "./styles";

interface GroupCardTitleProps {
  title: string
}

export function GroupCardTitle({title}: GroupCardTitleProps){
  return(
    <Title>{title}</Title>
  )
}