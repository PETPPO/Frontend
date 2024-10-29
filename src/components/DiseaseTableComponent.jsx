import React from 'react';
import styled from 'styled-components';

function TableComponent({ columns, data }) {
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
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
}

export default TableComponent;

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

