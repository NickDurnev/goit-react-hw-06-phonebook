import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import getFilteredContacts from 'redux/contacts/contacts-selectors';
import { TransitionGroup } from 'react-transition-group';
import { Container } from './ContactList.styled';
import Contact from 'components/Contact';

const ContactList = ({ onClick, animationTimeOut }) => {
  const filteredContacts = useSelector(getFilteredContacts);

  return (
    <Container>
      <TransitionGroup component="ul" className="contactsList">
        {filteredContacts.map(item => (
          <Contact
            key={item.id}
            item={item}
            onClick={onClick}
            animationTimeOut={animationTimeOut}
          />
        ))}
      </TransitionGroup>
    </Container>
  );
};

ContactList.propTypes = {
  onClick: PropTypes.func.isRequired,
  animationTimeOut: PropTypes.number.isRequired,
};

export default ContactList;
