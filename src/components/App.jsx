import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import contactsActions from '../redux/contacts/contacts-actions';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import AgreementModal from './AgreementModal';
import DropList from './DropList';
import { Container, StyledToastContainer } from './App.styled';
import { light, dark, blue } from '../themes';
import Button from './Button';
import changeTheme from 'redux/theme/theme-actions';
import { setModalOpen, setDropListOpen } from 'redux/isOpen/isOpen-actions';

export function App() {
  let deleteContactID = useRef(null);
  const animationTimeOut = useRef(parseInt(light.animationDuration));
  const modalRef = useRef(null);
  const dropListRef = useRef(null);
  const themes = useRef([light, dark, blue]);

  const contacts = useSelector(state => state.contacts.items);
  const theme = useSelector(state => state.theme);
  const isDropListOpen = useSelector(state => state.isOpen.dropList);
  const isModalOpen = useSelector(state => state.isOpen.modal);

  const dispatch = useDispatch();

  const checkAgreement = answear => {
    if (answear) {
      dispatch(contactsActions.deleteContact(deleteContactID.current));
    }
    dispatch(setModalOpen(false));
  };

  const openModalAgreement = id => {
    deleteContactID.current = id;
    dispatch(setModalOpen(true));
  };

  const handleChangeTheme = ({ theme }) => {
    dispatch(changeTheme(theme));
    dispatch(setDropListOpen(false));
  };

  const handleClickClose = e => {
    if (e.target === e.currentTarget) {
      dispatch(setDropListOpen(false));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container onClick={handleClickClose}>
        <Button
          onClick={() => dispatch(setDropListOpen(true))}
          padding={'5px 32px'}
          position={'absolute'}
          positionY={'30px'}
          positionX={'30px'}
        >
          Choose theme
        </Button>
        <CSSTransition
          nodeRef={dropListRef}
          in={isDropListOpen}
          timeout={animationTimeOut.current}
          classNames="drop"
          unmountOnExit
        >
          <DropList ref={dropListRef}>
            {themes.current.map(theme => {
              return (
                <Button
                  key={theme.name}
                  onClick={() => {
                    handleChangeTheme({ theme });
                  }}
                  padding="5px 10px"
                >
                  {theme.name}
                </Button>
              );
            })}
          </DropList>
        </CSSTransition>
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        <CSSTransition
          in={contacts.length > 0}
          timeout={animationTimeOut.current}
          unmountOnExit
        >
          <ContactList
            onClick={value => openModalAgreement(value)}
            animationTimeOut={animationTimeOut.current}
          />
        </CSSTransition>
        <CSSTransition
          nodeRef={modalRef}
          in={isModalOpen}
          timeout={animationTimeOut.current}
          classNames="fade"
          unmountOnExit
        >
          <AgreementModal ref={modalRef}>
            <p>Do you really want delete this contact?</p>
            <Button onClick={() => checkAgreement(false)} padding={'5px 15px'}>
              No
            </Button>
            <Button onClick={() => checkAgreement(true)} padding={'5px 15px'}>
              Yes
            </Button>
          </AgreementModal>
        </CSSTransition>
        <StyledToastContainer autoClose={3000} />
      </Container>
    </ThemeProvider>
  );
}
