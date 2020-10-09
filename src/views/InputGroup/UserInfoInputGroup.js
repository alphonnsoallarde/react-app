import React from 'react';
import PropTypes from 'prop-types';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from 'reactstrap';

export default function UserInfoInputGroup({
  userInfo,
  handleCreateUser,
  isDisabled
}) {
  return (
    <div>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>@</InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Email"
          name="email"
          value={userInfo.email}
          onChange={handleCreateUser}
          disabled={isDisabled} />
      </InputGroup>
      <InputGroup className="mt-2">
        <Input placeholder="First Name"
          name="firstName"
          value={userInfo.firstName}
          onChange={handleCreateUser}
          disabled={isDisabled} />
      </InputGroup>
      <InputGroup className="mt-2">
        <Input placeholder="Last Name"
          name="lastName"
          value={userInfo.lastName}
          onChange={handleCreateUser}
          disabled={isDisabled} />
      </InputGroup>
    </div>
  );
}

UserInfoInputGroup.propTypes = {
  userInfo: PropTypes.object.isRequired,
  handleCreateUser: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
}

UserInfoInputGroup.defaultProps = {
  userInfo: {},
  handleCreateUser: () => { },
  isDisabled: false
}