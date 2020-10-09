import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
} from 'reactstrap';

import ConfirmationModal from 'views/Modals/ConfirmationModal';
import { UserInfoInputGroup } from 'views/InputGroup';

export default function AddUser({
  userInfo,
  modal,
  confirmationModal,
  toggle,
  toggleConfirmationModal,
  toggleAll,
  closeModal,
  handleCreateUser,
  responseStatus,
  setResponseStatus
}) {
  const handleSubmit = (e) => {
    const formData = new FormData();

    Object.keys(userInfo).forEach(key => {
        formData.append(key, userInfo[key]);
    });
    
    axios.post('https://reqres.in/api/users', formData)
      .then(response => {
        console.log(response);
        toggleConfirmationModal();
        setResponseStatus(response.status);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add User</ModalHeader>
        <ModalBody>
          <UserInfoInputGroup userInfo={userInfo}
            handleCreateUser={handleCreateUser} />
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleSubmit}>Add</Button>
          <ConfirmationModal userInfo={userInfo}
            confirmationModal={confirmationModal}
            toggle={toggle}
            toggleConfirmationModal={toggleConfirmationModal}
            closeModal={closeModal}
            responseStatus={responseStatus} />
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

AddUser.propTypes = {
  modal: PropTypes.bool.isRequired,
  confirmationModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  toggleConfirmationModal: PropTypes.func.isRequired,
  toggleAll: PropTypes.func.isRequired
}

AddUser.defaultProps = {
  modal: false,
  confirmationModal: false,
  closeModal: false,
  toggle: () => {},
  toggleConfirmationModal: () => {},
  toggleAll: () => {}
}