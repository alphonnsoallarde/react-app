import React from 'react';
import {Container, Table} from 'reactstrap';
import PropTypes from 'prop-types';

import ShowModal from 'views/Modals';
import DataTablePagination from 'views/DataTable/Pagination';

export default function DataTable({
  users,
  usersList,
  handleSelected
}) {
  const columns = users[0] && Object.keys(users[0]);

  return (
    <Container>
      <ShowModal buttonLabel={"+ Add User"} actionType={'add-user'} buttonColor={'primary'} />

      <Table className="mt-3">
        <thead>
          <tr>
            {users[0] && columns.map((tableHeading, key) => <th key={key}>{tableHeading}</th>)}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((tableRow, key) => <tr key={key}>
            {
              columns.map((column, key) => <td key={key}>{tableRow[column]}</td>)
            }
            <td>
              <div className="text-right">
                <ShowModal userId={tableRow.id} buttonLabel={"Edit"} actionType={'edit-user'} buttonColor={'warning'} />
              </div>
            </td>
            <td>
              <div className="text-right">
                <ShowModal userId={tableRow.id} buttonLabel={"Delete"} actionType={'delete-user'} buttonColor={'danger'} />
              </div>
            </td>
          </tr>)}
        </tbody>
      </Table>

      <DataTablePagination usersList={usersList} handleSelected={handleSelected} />
    </Container>
  );
}

DataTable.propTypes = {
  users: PropTypes.array.isRequired,
  usersList: PropTypes.object.isRequired,
  handleSelected: PropTypes.func.isRequired
}

DataTable.defaultProps = {
  users: {},
  usersList: {},
  handleSelected: () => {}
}