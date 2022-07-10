import styled from 'styled-components';
import InputMask from 'comigo-tech-react-input-mask';

export const Form = styled.form`
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  padding: 20px;
  background-color: ${props => props.theme.bgColor};
`;

export const Label = styled.label`
  display: block;
  font-weight: ${props => props.theme.mainTextFontWeight};
  color: ${props => props.theme.textColor};
  text-align: center;

  & + & {
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

export const Input = styled(InputMask)`
  display: block;
  margin-top: 5px;
  width: 100%;
  border: solid 1px;
  border-radius: 5px;
  color: inherit;
  border-color: ${props => props.theme.bgElementColor};
  background-color: ${props => props.theme.bgColor};
  transition: border-color ${props => props.theme.hoverTransition}
    ${props => props.theme.hoverTimeFunction};

  &:hover,
  &:focus {
    border-color: ${props => props.theme.bgElementHoverColor};
  }
`;

export const Button = styled.button`
  display: block;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  color: ${props => props.theme.elementColor};
  background-color: ${props => props.theme.bgElementColor};
  transition: background-color ${props => props.theme.hoverTransition}
    ${props => props.theme.hoverTimeFunction};

  &:hover,
  &:focus {
    background-color: ${props => props.theme.bgElementHoverColor};
  }
`;
