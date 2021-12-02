import { Table, Space, Button, message } from 'antd';
import 'antd/dist/antd.css';
import { Row, StyledContent, StyledLayout } from './styles';
import Sidebar from '../Sidebar';
import useGetListOfUsers from 'hooks/useUsers';
import Loading from 'Components/Loading';
import { NotFound } from '../404/index';
import { Link } from 'react-router-dom';
import { lang } from 'language/en';
import { toBlockUnblockUser, toDeleteUser } from 'hooks/useUsers';
import { IUserId } from 'hooks/types';
import store from 'Redux/store';
import { Role, url } from 'constants/constants';
import { useState } from 'react';
import { NotAccess } from 'Components/403';
import { CollectionCreateForm } from '../AddUserModal/index';

const { Column } = Table;

const Users = (): JSX.Element => {
  const { error, isLoading, data } = useGetListOfUsers();
  const [visible, setVisible] = useState<boolean>(false);
  const state = store.getState();
  const role = state.person.user.role;
  if (isLoading) return <Loading />;
  if (role === Role.EMPLOYEE) return <NotAccess />;
  if (error instanceof Error) return <NotFound />;

  const InitialState = {
    canBlockUnblockUser: (role === 'admin'),
    canDeleteUser: (role === 'super'),
    canColumnRole: (role === 'super')
  };

  const blockUser = (dataIndex: boolean, key: IUserId) => {
    toBlockUnblockUser(dataIndex, key)
      .then(() => message.success(lang.updateStatus.success))
      .catch(() => message.success(lang.updateStatus.success));
  };

  const deleteUser = (dataIndex: string, key: IUserId) => {
    toDeleteUser({
    id: key.id,
    userId: dataIndex,
    })
    .then(() => message.success(lang.superAdmin.successDelete))
    .catch(() => message.success(lang.superAdmin.failDelete));
  };

  return (
    <StyledLayout>
      <Sidebar />
      <StyledContent>
        <Row justify="end">
          <Button
            size="large"
            type="primary"
            shape="round"
            onClick={() => setVisible(true)}
          >
            +
          </Button>
          <CollectionCreateForm
            visible={visible}
            onCreate={() => setVisible(false)}
            onCancel={() => setVisible(false)}
          />
        </Row>
        <Table dataSource={data}>
          <Column title={lang.userInfo.firstName} dataIndex="first_name" key="id" />
          <Column title={lang.userInfo.lastName} dataIndex="last_name" key="id" />
          {
            (InitialState.canColumnRole)
            &&
            <Column title={lang.superAdmin.roleTitle} dataIndex="role" key="id" />
          }
          <Column
            title={lang.superAdmin.actionsTitle}
            key="action"
            dataIndex="id"
            render={dataIndex => (
              <Space size="middle">
                <Link to={`${url.admin}${dataIndex}`}>Edit</Link>
              </Space>
            )}
          />
          <Column
            title={lang.userInfo.userStatus}
            dataIndex="is_block"
            key="id"
            render={(dataIndex, key: IUserId) => (
              <Space size="middle">
                {
                  (InitialState.canBlockUnblockUser)
                  &&
                  <Button
                    onClick={() => {
                      blockUser(dataIndex, key);
                    }}
                    htmlType="submit"
                    type="link"
                  >
                    {dataIndex ? lang.updateStatus.block : lang.updateStatus.unblock}
                  </Button>
                }
                {
                  (InitialState.canDeleteUser)
                  &&
                  <Button 
                    onClick={() => {
                      deleteUser(dataIndex, key)
                    }}
                    htmlType="submit"
                    type="link"
                  >
                    Delete User
                  </Button>}
              </Space>
            )}
          />
        </Table>
      </StyledContent>
    </StyledLayout>
  );
};
export default Users;
