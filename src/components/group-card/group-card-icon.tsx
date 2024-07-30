import { IconWeight } from "phosphor-react-native/src/lib"
import styled, { NativeTarget } from "styled-components/native"

interface GroupCardProps {
  icon: NativeTarget
  color: string
  weight?: IconWeight
}

export function GroupCardIcon({icon: IconTarget, weight, color}: GroupCardProps){
  const Icon = styled(IconTarget).attrs({
    size: 32,
    color,
    weight
  })`
    margin-right: 20px;
  `
  return(
    <Icon />
  )
}