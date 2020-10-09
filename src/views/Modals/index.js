import React, { useState } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import { UserModalTypes } from 'constants/modals.js';
import AddUser from 'views/Modals/Users/AddUser';
import EditUSer from 'views/Modals/Users/EditUser';
import DeleteUser from 'views/Modals/Users/DeleteUser';

const MODALS = {
  [UserModalTypes.ADD]: AddUser,
  [UserModalTypes.EDIT]: EditUSer,
  [UserModalTypes.DELETE]: DeleteUser,
};

export default function Modals({
  userId,
  buttonLabel,
  actionType,
  buttonColor
}) {
  const [modal, setModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [userInfo, setUserInfo] = useState({ 
    email: '', firstName: '', lastName: '' 
  });
  const [responseStatus, setResponseStatus] = useState(null);

  const toggle = () => setModal(!modal);

  const toggleConfirmationModal = () => {
    setConfirmationModal(!confirmationModal);
    setCloseModal(false);

    if (confirmationModal) window.location.reload();
  }

  const toggleAll = () => {
    setConfirmationModal(!confirmationModal);
    setCloseModal(true);
  }

  const fetchUserData = () => {
    axios.get(`https://reqres.in/api/users/${userId}`)
      .then(response => {
        setUserInfo({
          email: response.data.data.email,
          firstName: response.data.data.first_name,
          lastName: response.data.data.last_name
        });
      });
  };

  const handleCreateUser = (e) => setUserInfo({
    ...userInfo,
    [e.target.name]: e.target.value
  });

  const Modal = actionType ? MODALS[actionType] : <div />;

  return (
    <div>
      <div className="text-right">
        <Button className="mt-2" color={buttonColor} onClick={toggle}>{buttonLabel}</Button>
      </div>
      <Modal userInfo={userInfo}
        userId={userId}
        modal={modal}
        confirmationModal={confirmationModal}
        toggle={toggle}
        toggleConfirmationModal={toggleConfirmationModal}
        toggleAll={toggleAll}
        closeModal={closeModal}
        fetchUserData={fetchUserData}
        handleCreateUser={handleCreateUser}
        responseStatus={responseStatus}
        setResponseStatus={setResponseStatus} />
    </div>
  );
}

Modals.propTypes = {
  userId: PropTypes.number.isRequired,
  buttonLabel: PropTypes.string,
  actionType: PropTypes.string,
  buttonColor: PropTypes.string
}

Modals.defaultProps = {
  userId: 0,
  buttonLabel: '',
  actionType: '',
  buttonColor: ''
}