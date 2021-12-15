import styled from "styled-components";
import DatePicker from 'react-datepicker';

import { Layout, Button, List } from "antd";

export const StyledLayout = styled(Layout)`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;
export const StyledButton = styled(Button)`
  width: 150px;
  margin-left: auto;
  margin-bottom: 25px;
  border-radius: 10px;
  position: static;
`;

export const StyledContent = styled(Layout)`
  padding: 25px;
  overflow-x: scroll;
`;

export const StyledList = styled(List)``;

export const StyledItem = styled(List)`
  cursor: pointer;
  padding-top: 38px;
  padding-left: 5px;
  height: 100px;
  color: #fff;
  border: 1px solid #fff;
  :hover {
    color: #2196f3;
    padding-left: 15px;
  }
`;
