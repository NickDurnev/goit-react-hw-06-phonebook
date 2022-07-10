import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getFilteredContacts from 'redux/contacts/contacts.selectors';
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
import changeTheme from 'redux/theme/theme.actions';

export function App() {
  let deleteContactID = useRef(null);
  const animationTimeOut = useRef(parseInt(light.animationDuration));
  const modalRef = useRef(null);
  const dropListRef = useRef(null);
  const themes = useRef([light, dark, blue]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const filteredContacts = useSelector(getFilteredContacts);
  const theme = useSelector(state => state.theme);

  const dispatch = useDispatch();

  const checkAgreement = answear => {
    if (answear) {
      dispatch(contactsActions.deleteContact(deleteContactID.current));
    }
    setModalOpen(false);
  };

  const openModalAgreement = id => {
    deleteContactID.current = id;
    setModalOpen(true);
  };

  const handleChangeTheme = ({ theme }) => {
    dispatch(changeTheme(theme));
    setSidebarOpen(false);
  };

  const handleClickClose = e => {
    if (e.target === e.currentTarget) {
      setSidebarOpen(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container onClick={handleClickClose}>
        <Button
          onClick={() => setSidebarOpen(true)}
          padding={'5px 32px'}
          position={'absolute'}
          positionY={'30px'}
          positionX={'30px'}
        >
          Choose theme
        </Button>
        <CSSTransition
          nodeRef={dropListRef}
          in={isSidebarOpen}
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
        <ContactForm
          onSubmit={contact => {
            return dispatch(contactsActions.addContact(contact));
          }}
        />

        <h2>Contacts</h2>
        <Filter
          onChange={value => dispatch(contactsActions.changeFilter(value))}
          filter={filter}
        />
        <CSSTransition
          in={contacts.length > 0}
          timeout={animationTimeOut.current}
          unmountOnExit
        >
          <ContactList
            filterItems={filteredContacts}
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
