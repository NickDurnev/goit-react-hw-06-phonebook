import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { Modal, Backdrop } from './AgreementModal.styled';

const modalRoot = document.querySelector('#modal-root');

const AgreementModal = forwardRef(({ children }, ref) => {
  return createPortal(
    <Backdrop ref={ref}>
      <Modal>{children}</Modal>
    </Backdrop>,
    modalRoot
  );
});

AgreementModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AgreementModal;
