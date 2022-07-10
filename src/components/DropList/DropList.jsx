import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import List from './DropList.styled';

const DropList = forwardRef(({ children }, ref) => (
  <List ref={ref}>
    {children.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </List>
));

DropList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DropList;
