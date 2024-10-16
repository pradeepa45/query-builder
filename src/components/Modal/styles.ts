import { styled } from "@mui/material";
import { Modal as BaseModal } from "@mui/base";

export const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled("div")`
  text-align: start;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
`;
