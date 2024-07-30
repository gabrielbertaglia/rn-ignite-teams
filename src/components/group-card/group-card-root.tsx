import { ReactNode } from "react"
import { TouchableOpacityProps } from "react-native"
import { Container, ContainerProps } from "./styles"

interface GroupCardRootProps extends TouchableOpacityProps {
  children: ReactNode
  padding?: ContainerProps
}

export function GroupCardRoot({children, padding, ...rest}: GroupCardRootProps){

  return(
    <Container padding={padding} {...rest}>
      {children}
    </Container>
  )
}