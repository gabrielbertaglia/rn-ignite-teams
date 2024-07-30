import { TouchableOpacityProps } from "react-native";
import { ButtonStyleProps, Container, Text } from "./styles";

interface ButtonPropsComponent extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: ButtonStyleProps
}

export function Button({children, variant = 'primary', ...rest}: ButtonPropsComponent){
  return(
    <Container variant={variant} {...rest}>
      <Text>{children}</Text>
    </Container>
  )
}