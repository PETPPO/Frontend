import React from 'react';
import styled from 'styled-components';
import { FiTrash2 } from 'react-icons/fi';

function TableComponent({ columns, data, onDelete }) {
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
              {Object.entries(row).map(([key, value], idx) => (
                // 'title' 항목에만 툴팁 적용
                <TableCell key={idx}>
                  {key === 'title' ? (
                    <TooltipContainer>
                      <span>{value.length > 20 ? `${value.slice(0, 20)}...` : value}</span>
                      <Tooltip>{value}</Tooltip>
                    </TooltipContainer>
                  ) : (
                    value
                  )}
                </TableCell>
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

// 툴팁 스타일 정의
const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const Tooltip = styled.span`
  visibility: hidden;
  width: 200px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 14px;

  ${TooltipContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
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
