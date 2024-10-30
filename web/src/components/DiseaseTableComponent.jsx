import React from 'react';
import styled from 'styled-components';

function DiseaseTableComponent({ columns, data }) {
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
                <TableCell key={idx}>
                  {(key === 'diseaseDescription' || key === 'healthGuidance') ? (
                    <TooltipContainer>
                      <span>{value.length > 20 ? `${value.slice(0, 20)}...` : value}</span>
                      <Tooltip>{value}</Tooltip>
                    </TooltipContainer>
                  ) : (
                    value
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
}

export default DiseaseTableComponent;

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
