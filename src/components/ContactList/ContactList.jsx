import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import { Container } from './ContactList.styled';
import Contact from 'components/Contact';

const ContactList = ({ filterItems, onClick, animationTimeOut }) => (
  <Container>
    <TransitionGroup component="ul" className="contactsList">
      {filterItems.map(item => (
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

ContactList.propTypes = {
  filterItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
  animationTimeOut: PropTypes.number.isRequired,
};

export default ContactList;
