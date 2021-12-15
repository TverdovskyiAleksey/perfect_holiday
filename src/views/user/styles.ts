import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import { Layout, Button, Form, Select } from 'antd';

const { Content } = Layout;

export const StyledDatePicker = styled(DatePicker)`
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  text-align: center;
  padding: 4px 15px;

  :hover {
    border: 1px solid #40a9ff;
  }

  :focus {
    border-color: #40a9ff;
    outline: 0; 
    -webkit-box-shadow: 0px 0px 2px 1px rgba(105, 192, 255, 0.93);
    -moz-box-shadow: 0px 0px 2px 1px rgba(105, 192, 255, 0.93);
    box-shadow: 0px 0px 2px 1px rgba(105, 192, 255, 0.93);
  }
`;

export const StyledLayout = styled(Layout)`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const SelectBlock = styled(Select)`
  width: 120px;
`;

export const StyledDivNameInfo = styled('div')`
  font-size: 20px;
  margin-bottom: 20px;
`;

export const StyledDivVacationInfo = styled('div')`
  :not(:last-child) {
    margin-right: 30px;
  }
  font-size: 20px;
`;
export const StyledDivContent = styled('div')`
  padding: 24px;
  text-align: left;
`;

export const StyledModalContent = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  text-align: left;
`;

export const StyledInputContent = styled('div')`
  display: flex;
  flex-direction: row;
  padding-top: 20px;
`;

export const StyledFormItem = styled(Form.Item)`
  display: inline-block;
  width: calc(50% - 8px);
  margin-right: 8px;
`;
export const StyledButton = styled(Button)`
  float: right;
  width: 150px;
  color: black;
  background-color: #dcdcdc;
  border: 1px solid transparent;
  margin-bottom: 20px;
`;
export const StyledContent = styled(Content)`
  padding: 25px;
  overflow: initial;
`;
