import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupText, 
  Input 
} from 'reactstrap';

import axios from 'axios';

export default function EditUser({
  userId,
  modal,
  confirmationModal,
  toggle,
  toggleConfirmationModal,
  toggleAll,
  closeModal
}) {
  const [userInfo, setUserInfo] = useState([
    { email: '', firstName: '', lastName: '' }
  ]);

  const fetchUserData = useCallback(() => {
    axios.get(`https://reqres.in/api/users/${userId}`)
      .then(response => {
        setUserInfo({
          email: response.data.data.email,
          firstName: response.data.data.first_name,
          lastName: response.data.data.last_name
        });
      });
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleCreateUser = (e) => setUserInfo({
    ...userInfo,
    [e.target.name]: e.target.value
  });

  const handleSubmit = (e) => {
    axios.put(`https://reqres.in/api/users/${userId}`, {
      email: userInfo.email,
      first_name: userInfo.firstName,
      last_name: userInfo.lastName
    })
      .then(response => {
        toggleConfirmationModal();
        window.location.reload();
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
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>@</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="Email"
              name="email"
              value={userInfo.email}
              onChange={handleCreateUser} />
          </InputGroup>
          <InputGroup className="mt-2">
            <Input placeholder="First Name" 
              name="firstName"
              value={userInfo.firstName}
              onChange={handleCreateUser} />
          </InputGroup>
          <InputGroup className="mt-2">
            <Input placeholder="Last Name" 
              name="lastName"
              value={userInfo.lastName}
              onChange={handleCreateUser} />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={toggleConfirmationModal}>Update</Button>
          <Modal isOpen={confirmationModal} toggle={toggleConfirmationModal} onClosed={closeModal ? toggle : undefined}>
            <ModalHeader>User Info</ModalHeader>
            <ModalBody>
              {userInfo.email}
              <br />
              {userInfo.firstName}
              <br />
              {userInfo.lastName}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleSubmit}>Submit</Button>
            </ModalFooter>
          </Modal>
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