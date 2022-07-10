import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.backdropColor};
  color: ${props => props.theme.textColor};
  overflow-y: scroll;

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    transition: opacity ${props => props.theme.animationDuration}
      ${props => props.theme.animationTimeFunction};
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
    transition: opacity ${props => props.theme.animationDuration}
      ${props => props.theme.animationTimeFunction};
  }
`;

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  background-color: ${props => props.theme.bgColor};
  font-weight: ${props => props.theme.mainTextFontWeight};

  & > p {
    margin-bottom: 10px;
  }

  & button + button {
    margin-left: 20px;
  }
`;
