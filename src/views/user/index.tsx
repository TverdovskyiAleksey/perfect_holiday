import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { lang } from 'language/en';
import { Row, Form, Modal, Button, Table, Select } from 'antd';
import './index.css';
import {
  StyledLayout,
  StyledContent,
  StyledButton,
  StyledDivNameInfo,
  StyledDivContent,
  StyledDivVacationInfo,
  SelectBlock,
  StyledModalContent,
  StyledInputContent,
} from './styles';
import {
  columns,
  howManyPassSickDays,
  howManyPassVacationDays,
  showCurrentDate,
} from './const';
import { sellectItemColor } from 'constants/constants';
import Layout from './layout';
import Sidebar from 'Components/Sidebar';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { bookigRestDays, getUserRequestDays } from 'hooks/useUsers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TBookkHoliday, THoliday } from 'hooks/types';
import store from 'Redux/store';
import { TypeRestDay } from './types';
import { DECLINED } from 'constants/statuses';

const { Option } = Select;

type Vacation = {
  startDate: Date;
  endDate: Date;
};

const UserView = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [type, setType] = useState<string>('vacation');
  const { control, handleSubmit, watch } = useForm<Vacation>();

  const watchAll = watch();
  const today = new Date();

  const newStartDate = new Date(watchAll.startDate);
  const newEndDate = new Date(watchAll.endDate);

  const state = store.getState();

  const userId = state.person.user.id;
  const name = state.person.user.name;
  const sick = state.person.user.sickDays;
  const vacation = state.person.user.vacationDays;

  const { data, refetch, isRefetching, isFetched } = getUserRequestDays(userId);

  const start_date = showCurrentDate(newStartDate);
  const end_date = showCurrentDate(newEndDate);

  const days: TBookkHoliday = { type, start_date, end_date };

  const onChangeType = (type: any) => {
    setType(type);
  };

  const onSubmit: SubmitHandler<Vacation> = () => {
    onChangeType(type);
    bookigRestDays(days, userId);
    toggleModal();
    refetch();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const SelectColor = (record: { status: string }) => {
    return sellectItemColor(record.status) || '';
  };

  let userVacations;
  let lastSickDay: Date;
  let lastVacationDay: Date;
  let sickDays;
  let vacationDays;

  if (isRefetching || isFetched) {
    userVacations = data?.find(user => user.vacations)?.vacations;
    sickDays = userVacations?.filter(
      val => val.type === TypeRestDay.SICK && val.status !== DECLINED,
    );
    vacationDays = userVacations?.filter(
      val => val.type === TypeRestDay.VACATION && val.status !== DECLINED,
    );
  }

  if (sickDays === undefined || sickDays.length <= 1) {
    lastSickDay = today;
  } else {
    lastSickDay = new Date(
      sickDays.sort(
        (val1: THoliday, val2: THoliday) =>
          Number(new Date(val1.end_date)) - Number(new Date(val2.end_date)),
      )[sickDays.length - 1].end_date,
    );
    lastSickDay.setDate(lastSickDay.getDate() + howManyPassSickDays);
  }
  if (vacationDays === undefined || vacationDays.length <= 1) {
    lastVacationDay = today;
  } else {
    lastVacationDay = new Date(
      vacationDays.sort(
        (val1: THoliday, val2: THoliday) =>
          Number(new Date(val1.end_date)) - Number(new Date(val2.end_date)),
      )[vacationDays.length - 1].end_date,
    );
    lastVacationDay.setDate(lastVacationDay.getDate() + howManyPassVacationDays);
  }
  return (
    <Layout>
      <StyledLayout>
        {Modal && (
          <Modal
            onCancel={toggleModal}
            visible={isModalVisible}
            wrapClassName="reservation_modal"
            width={600}
            footer={null}
          >
            <div className="reserv_message">Please choose dates of reservation.</div>
            <Form onSubmitCapture={handleSubmit(onSubmit)}>
              <StyledInputContent>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        selectsStart
                        dateFormat="dd.MM.yyyy"
                        startDate={watchAll.startDate}
                        endDate={watchAll.endDate}
                        maxDate={watchAll.endDate}
                        minDate={
                          type === TypeRestDay.VACATION
                            ? lastVacationDay
                            : lastSickDay
                        }
                        selected={field.value}
                        onChange={field.onChange}
                        placeholderText="Start date"
                      />
                    );
                  }}
                />
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        selectsEnd
                        dateFormat="dd.MM.yyyy"
                        startDate={watchAll.startDate}
                        endDate={watchAll.endDate}
                        minDate={watchAll.startDate}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholderText="End date"
                      />
                    );
                  }}
                />
                <SelectBlock
                  size="middle"
                  defaultValue="vacation"
                  onSelect={type => onChangeType(type)}
                  value={type}
                >
                  <Option value="vacation">Vacation</Option>
                  <Option value="sick">Sick leave</Option>
                </SelectBlock>
              </StyledInputContent>

              <StyledModalContent>
                <Button onClick={toggleModal}>Cancel</Button>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Confirm Reservation
                  </Button>
                </Form.Item>
              </StyledModalContent>
            </Form>
          </Modal>
        )}
        <Sidebar />
        <StyledContent>
          <StyledDivContent className="site-layout-background">
            <Row>
              <StyledDivNameInfo>
                <strong>Welcome, {name}</strong>
              </StyledDivNameInfo>
            </Row>
            <Row>
              <StyledDivVacationInfo>
                <strong>{sick} sick leave</strong>
              </StyledDivVacationInfo>
              <StyledDivVacationInfo>
                <strong>{vacation} vacation days</strong>
              </StyledDivVacationInfo>
            </Row>
          </StyledDivContent>
          <StyledButton
            type="primary"
            shape="round"
            htmlType="submit"
            size="large"
            onClick={() => setIsModalVisible(true)}
          >
            +
          </StyledButton>
          <Table
            columns={columns}
            dataSource={data}
            size="large"
            rowClassName={SelectColor}
          />
        </StyledContent>
      </StyledLayout>
    </Layout>
  );
};
export default UserView;
