import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-reactstrap-pagination';

export default function DataTablePagination({
  usersList,
  handleSelected
}) {
 
  return (
    <Pagination
      totalItems={(usersList && usersList.total) ? usersList.total : 0}
      pageSize={(usersList && usersList.per_page) ? usersList.per_page : 0}
      onSelect={handleSelected}
    />
  );
}

DataTablePagination.propTypes = {
  usersList: PropTypes.object.isRequired,
  handleSelected: PropTypes.func.isRequired
}

DataTablePagination.defaultProps = {
  usersList: {},
  handleSelected: () => {}
}