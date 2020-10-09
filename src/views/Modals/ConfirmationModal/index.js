import React from 'react';
import PropTypes from 'prop-types';
import { 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
} from 'reactstrap';

export default function ConfirmationModal({
  userInfo,
  confirmationModal,
  toggle,
  toggleConfirmationModal,
  closeModal,
  responseStatus,
}) {
  const getHeaderMessage = () => {
      switch (responseStatus) {
        case 200:
          return 'Success!';
        case 201:
          return 'Created!';
        case 400:
          return 'Failed!';
        case 404:
          return 'Not Found!';
        default:
          return 'Error!'
      }
  };

  return (
    <div>
      <Modal isOpen={confirmationModal} toggle={toggleConfirmationModal} onClosed={closeModal ? toggle : undefined}>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalBody>
          <h3>{getHeaderMessage()}</h3>
          <br />
          Email: {userInfo.email}
          <br />
          First name: {userInfo.firstName}
          <br />
          Last name: {userInfo.lastName}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleConfirmationModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

ConfirmationModal.propTypes = {
  userInfo: PropTypes.object.isRequired,
  confirmationModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  toggleConfirmationModal: PropTypes.func.isRequired,
  toggleAll: PropTypes.func.isRequired
}

ConfirmationModal.defaultProps = {
  modal: false,
  confirmationModal: false,
  closeModal: false,
  toggle: () => {},
  toggleConfirmationModal: () => {},
  toggleAll: () => {}
}