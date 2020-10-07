import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'views/DataTable';

function Index() {
  const [users, setUsers] = useState([]);
  const [usersList, setUsersList] = useState({});
  const [selectedPage, setSelectedPage] = useState(1);

  const handleSelected = (pageNumber) => setSelectedPage(pageNumber);

  useEffect(() => {
    axios.get(`https://reqres.in/api/users?page=${selectedPage}`)
      .then(response => {
        setUsers(response.data.data)
        setUsersList(response.data);
      });
  }, [selectedPage]);

  return (
    <DataTable users={users} usersList={usersList} handleSelected={handleSelected} />
  );
}

export default Index;
