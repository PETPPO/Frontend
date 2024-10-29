import React from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  z-index: 10001;
  width: 458px;
  height: 232px;
  text-align: center;
  font-size: 20px;
  p {
    margin-top: 80px;
  }
`;

const ConfirmButton = styled.button`
  background-color: #FC7E2F;
  color: white;
  width: 400px;
  height: 58px;
  margin: 10px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 19px;
`;

function ConfirmModal({ onConfirm, msg }) {
  return (
    <ModalBackdrop>
      <ModalContent>
        <p>{msg}</p>
        <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
      </ModalContent>
    </ModalBackdrop>
  );
}

export default ConfirmModal;
