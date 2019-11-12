// @flow

import React, { useEffect, useState }                   from "react";
import { Cell, CellButton, Group, IOS, List, platform } from "@vkontakte/vkui";
import { Panel, PanelHeader, PanelSpinner }             from "@vkontakte/vkui";
import { ModalRoot, ActionSheet, ActionSheetItem }      from "@vkontakte/vkui";
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import { back }               from "../../../utils/default/url";
import useConfigs             from "../../../hooks/useConfigs";
import SelectRoleUserModal    from "./modals/SelectRoleUser";
import SelectUserModal        from "./modals/SelectUserModal";
import UserRoleCell           from "./UserRoleCell";
import useUserToken           from "../../../hooks/useUserToken";
import useContextMenu         from "./edit/useContextMenu";

const osname = platform();

type P = {
  id: MenuViewId,
  setModal: React$Node => any,
  setPopout: React$Node => any
};

export default function UsersRolesPanel(p: P) {
  const [config: ?TwoDanceConfigs, update, refresh] = useConfigs(),
    token = useUserToken(true),
    [activeModal, setActiveModal] = useState(null),
    [activeUserId, setActiveUserId] = useState<?number>(null),
    [activeUserRole, setActiveUserRole] = useState<?(
      | "admin"
      | "editor"
      | "reception"
    )>(null),
        [onUserContext] = useContextMenu(p.setPopout, p.setModal, refresh);

  useEffect(() => {
    if (activeUserId && !activeUserRole) {
      setActiveModal("select-role-user");
    }
  }, [activeUserId, activeUserRole]);

  useEffect(() => {
    p.setModal(
      <ModalRoot activeModal={activeModal}>
        <SelectUserModal
          id="select-user"
          onSelect={async id => setActiveUserId(id)}
          onClose={() => setActiveModal(null)}
        />
        <SelectRoleUserModal
          id="select-role-user"
          onClose={() => setActiveModal(null)}
          onSelect={async role => setActiveUserRole(role)}
        />
      </ModalRoot>
    );
  }, [activeModal]);

  useEffect(() => {
    if (activeUserId && activeUserRole) {
      const userRole: UserRoleGroup = {
        vkUserId: activeUserId,
        role: activeUserRole
      };
      const finded =
        config.roles && config.roles.find(r => r.vkUserId === activeUserId);
      if (!finded) {
        const roles = [...(config.roles || []), userRole];
        update({ ...config, roles }).then(() => {
          setActiveModal(null);
          setActiveUserId(null);
          setActiveUserRole(null);
          refresh();
        });
      }
    }
  }, [activeUserId, activeUserRole, update, refresh, config]);

  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons type="back" back={back} />}>
        Права пользователй
      </PanelHeader>
      {!config && <PanelSpinner />}
      {config && token && (
        <Group>
          <List>
            <CellButton
              onClick={() => setActiveModal("select-user")}
              align="center"
              before={<i className="fas fa-plus" />}
            >
              Добавить
            </CellButton>
            {config.roles &&
              config.roles.map(r => (
                <UserRoleCell
                  key={"user-role-" + r.vkUserId}
                  role={r}
                  token={token}
                  onMore={onUserContext}
                />
              ))}
          </List>
        </Group>
      )}
    </Panel>
  );
}
