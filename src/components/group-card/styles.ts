import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type ContainerProps = number | undefined;

interface ContainerStyleProps {
  padding?: ContainerProps;
}

export const Container = styled(TouchableOpacity)<ContainerStyleProps>`
  width: 100%;

  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;
  flex-direction: row;
  align-items: center;

  margin-bottom: 12px;

  padding: ${({ padding }) => (padding ? padding : 32)}px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_200};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;
