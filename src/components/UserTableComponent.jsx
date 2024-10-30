import React from 'react';
import styled from 'styled-components';
import { FiTrash2 } from 'react-icons/fi';

function UserTableComponent({ columns, data, onDelete }) {
  return (
    <TableWrapper>
      <Table>
        <thead>
          <TableRow>
            {columns.map((column, index) => (
              <TableHeader key={index}>{column}</TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((value, idx) => (
                <TableCell key={idx}>{value}</TableCell>
              ))}
              <TableCell>
                <DeleteButton onClick={() => onDelete(row.id)}>
                  <FiTrash2 />
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
}

export default UserTableComponent;

const TableWrapper = styled.div`
  width: 80%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const TableRow = styled.tr`
  background-color: #fff;
  &:nth-child(even) {
    background-color: #FFF2D7;
  }
`;

const TableHeader = styled.th`
  padding: 15px;
  background-color: #FFB07A;
  color: white;
  text-align: center;
  font-size: 25px;
`;

const TableCell = styled.td`
  padding: 18px;
  font-size: 20px;
  border: 1px solid #979797;
  text-align: center;
  color: #898A8D;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #FF9A62;
  cursor: pointer;
  font-size: 1.4rem;

  &:hover {
    color: #c0392b;
  }
`;
