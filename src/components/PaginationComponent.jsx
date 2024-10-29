import React from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationWrapper>
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FiChevronLeft />
      </PaginationButton>
      {pageNumbers.map((number) => (
        <PageNumber
          key={number}
          onClick={() => onPageChange(number)}
          isActive={number === currentPage}
        >
          {number}
        </PageNumber>
      ))}
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FiChevronRight />
      </PaginationButton>
    </PaginationWrapper>
  );
}

export default PaginationComponent;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const PaginationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #FC7E2F;
  transition: color 0.3s;

  &:disabled {
    color: #ccc;
    cursor: default;
  }

  &:hover:not(:disabled) {
    color: #e5691f;
  }
`;

const PageNumber = styled.button`
  background: ${(props) => (props.isActive ? '#FC7E2F' : 'none')};
  border: ${(props) => (props.isActive ? '2px solid #FC7E2F' : '2px solid #C3C3C3')};
  color: ${(props) => (props.isActive ? '#fff' : '#C3C3C3')};
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  margin: 0 5px;
  padding: 8px 12px;
  border-radius: 50%;
  transition: background 0.3s, color 0.3s, border 0.3s;

  &:hover {
    background: #FC7E2F;
    color: #fff;
  }
`;

