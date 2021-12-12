import { User,IUserId } from "hooks/types";


export interface CollectionDeleteProps {
  values: { dataIndex: string, key: IUserId }
  visible: boolean;
  onCreate: () => void;
  onCancel: () => void;
}
