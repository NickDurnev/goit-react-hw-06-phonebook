import { useDispatch, useSelector } from 'react-redux';
import contactsActions from '../../redux/contacts/contacts-actions';
import { Label } from './Filter.styled';

const Filter = () => {
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  return (
    <Label>
      Find contacts by name
      <input
        type="text"
        name="filter"
        onChange={e => dispatch(contactsActions.changeFilter(e.target.value))}
        value={filter}
      />
    </Label>
  );
};

export default Filter;
