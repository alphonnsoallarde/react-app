import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
} from 'reactstrap';

import ConfirmationModal from 'views/Modals/ConfirmationModal';
import { UserInfoInputGroup } from 'views/InputGroup';

export default function EditUser({
  userInfo,
  userId,
  modal,
  confirmationModal,
  toggle,
  toggleConfirmationModal,
  toggleAll,
  closeModal,
  fetchUserData,
  handleCreateUser,
  responseStatus,
  setResponseStatus
}) {
  useEffect(() => {
    if (modal) fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  const handleSubmit = (e) => {
    const formData = new FormData();

    Object.keys(userInfo).forEach(key => {
        formData.append(key, userInfo[key]);
    });

    axios.put(`https://reqres.in/api/users/${userId}`, {
      email: userInfo.email,
      first_name: userInfo.firstName,
      last_name: userInfo.lastName
    })
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
        <ModalHeader toggle={toggle}>Edit User</ModalHeader>
        <ModalBody>
          <UserInfoInputGroup userInfo={userInfo}
            handleCreateUser={handleCreateUser} />
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={handleSubmit}>Update</Button>
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

EditUser.propTypes = {
  userId: PropTypes.number.isRequired,
  modal: PropTypes.bool.isRequired,
  confirmationModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  toggleConfirmationModal: PropTypes.func.isRequired,
  toggleAll: PropTypes.func.isRequired
}

EditUser.defaultProps = {
  userId: 0,
  modal: false,
  confirmationModal: false,
  closeModal: false,
  toggle: () => {},
  toggleConfirmationModal: () => {},
  toggleAll: () => {}
}