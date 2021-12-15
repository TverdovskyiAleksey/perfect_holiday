import { Button, Space, Table, message, Modal, Form } from 'antd';
import { StyledLayout, StyledContent } from './styles';
import Sidebar from 'Components/Sidebar';
import {
  useAllNotApprovedRestDays,
  toApprovedOrDisapproveRestDay,
  toEditRestDays,
} from 'hooks/useUsers';
import Loading from 'Components/Loading';
import { lang } from 'language/en';
import { APPROVED, DECLINED, CHANGED } from 'constants/statuses';
import { IUserId, TEditRestDays, TVacationRestDays } from 'hooks/types';
import { StyledInputContent, StyledModalContent, StyledDatePicker  } from 'views/user/styles'
import { Controller, useForm } from 'react-hook-form';
import { showCurrentDate } from 'views/user/const';
import { useState } from 'react';

const { Column } = Table;

const Dashbord = (): JSX.Element => {
  const { error, isLoading, data, refetch } = useAllNotApprovedRestDays();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { control, handleSubmit, watch } = useForm<TVacationRestDays>();
  const [ids, setIds] = useState<TEditRestDays>();

  if (isLoading) return <Loading />;
  if (error instanceof Error) return <h1>Error: {error.message}</h1>;

  const watchAll = watch();
  const today = new Date();

  const newStartDate = new Date(watchAll.startDate);
  const newEndDate = new Date(watchAll.endDate);

  const start_date = showCurrentDate(newStartDate);
  const end_date = showCurrentDate(newEndDate);

  const putStatusApproved = (dataIndex: string, key: IUserId) => {
    toApprovedOrDisapproveRestDay({
      status: APPROVED,
      id: key.id,
      userId: dataIndex,
    })
      .then(() => message.loading(lang.info.loading))
      .catch(() => message.error(lang.dashboard.failMessageStatusApproved))
      .finally(() => {
        return refetch(), message.success(lang.dashboard.messageStatusApproved);
      });
  };

  const putStatusDeclined = (dataIndex: string, key: IUserId) => {
    toApprovedOrDisapproveRestDay({
      status: DECLINED,
      id: key.id,
      userId: dataIndex,
    })
      .then(() => message.loading(lang.info.loading))
      .catch(() => message.error(lang.dashboard.failMessageStatusDeclined))
      .finally(() => {
        return refetch(), message.success(lang.dashboard.messageStatusDeclined);
      });
  };

  const onSubmit = () => {
    toEditRestDays({
      ...ids,
      status: CHANGED,
      start_date: start_date,
      end_date: end_date,
    })
    .then(() => message.loading(lang.info.loading))
    .catch(() => message.error(lang.dashboard.failMessageStatusEditing))
    .finally(() => {
      return refetch(), message.success(lang.dashboard.messageStatusEditing);
    });
    toggleModal()
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <StyledLayout>
      <Modal
        onCancel={toggleModal}
        visible={isModalVisible}
        wrapClassName="reservation_modal"
        width={600}
        footer={null}
      >
        <div className="reserv_message">{lang.modalCalendar.topText}</div>
        <Form onSubmitCapture={handleSubmit(onSubmit)}>
          <StyledInputContent>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => {
                return (
                  <StyledDatePicker
                    selectsStart
                    dateFormat="dd.MM.yyyy"
                    startDate={watchAll.startDate}
                    endDate={watchAll.endDate}
                    maxDate={watchAll.endDate}
                    minDate={today}
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
                  <StyledDatePicker
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
          </StyledInputContent>

          <StyledModalContent>
            <Button onClick={toggleModal}>{lang.modalCalendar.cancelButton}</Button>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {lang.modalCalendar.confirmButton}
              </Button>
            </Form.Item>
          </StyledModalContent>
        </Form>
      </Modal>
      <Sidebar />
      <StyledContent>
        <Table dataSource={data} pagination={{ pageSize: 10 }}>
          <Column
            title={lang.dashboard.userFirstName}
            dataIndex={['user', 'first_name']}
            key="id"
          />
          <Column
            title={lang.dashboard.userLastName}
            dataIndex={['user', 'last_name']}
            key="id"
          />
          <Column
            title={lang.dashboard.startDateTitle}
            dataIndex="start_date"
            key="id"
          />
          <Column
            title={lang.dashboard.endDateTitle}
            dataIndex="end_date"
            key="id"
          />
          <Column title={lang.dashboard.typeTitle} dataIndex="type" key="id" />
          <Column
            title={lang.dashboard.actionTitle}
            dataIndex={['user', 'id']}
            key="id"
            defaultFilteredValue={['user', 'userId']}
            render={(dataIndex: string, key: IUserId) => (
              <Space size="middle">
                <Button
                  htmlType="submit"
                  type="link"
                  onClick={() => putStatusApproved(dataIndex, key)}
                >
                  {lang.dashboard.approveButton}
                </Button>
                <Button
                  htmlType="submit"
                  type="link"
                  onClick={() => putStatusDeclined(dataIndex, key)}
                >
                  {lang.dashboard.declineButton}
                </Button>
                <Button
                  htmlType="submit"
                  type="link"
                  onClick={() => {
                    setIsModalVisible(true),
                      setIds({ userId: dataIndex, id: key.id });
                  }}
                >
                  {lang.dashboard.editButton}
                </Button>
              </Space>
            )}
          />
        </Table>
      </StyledContent>
    </StyledLayout>
  );
};

export default Dashbord;