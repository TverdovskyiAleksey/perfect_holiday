import {message, Modal} from 'antd';
import useGetListOfUsers, {toDeleteUser} from 'hooks/useUsers';
import {lang} from 'language/en';
import {CollectionDeleteProps} from './types';
import store from 'Redux/store';
import {Role} from 'constants/constants';


export const CollectionDeleteForm: React.FC<CollectionDeleteProps> = ({values, visible, onCreate, onCancel}) => {
    const {refetch} = useGetListOfUsers();
    const state = store.getState();
    const role = state.person.user.role;
    const InitialState = {
        canSelectRoleInModal: role === Role.SUPER,
    };
    return (
        <Modal
            mask={false}
            visible={visible}
            title={lang.deleteUser.title}
            okText={lang.deleteUser.okText}
            cancelText={lang.deleteUser.cancelText}
            onCancel={onCancel}
            onOk={() => {
                toDeleteUser({
                    id: values.key.id,
                    userId: values.dataIndex,
                }).then(() => {
                    refetch();
                    message.success(lang.superAdmin.successDelete, 5);
                }).catch(() => {
                    message.error(lang.addUser.succeess, 5);
                });
                onCreate();
            }}
        >
            {lang.deleteUser.description}
        </Modal>
    );
};
