// @flow
import React, { useEffect, useMemo, useState } from "react";
import ContextMenu from "./ContextMenu";
import SelectRoleUserModal from "../modals/SelectRoleUser";
import { ModalRoot } from "@vkontakte/vkui";
import useConfigs from "../../../../hooks/useConfigs";

type Roles = "admin" | "editor" | "reception";

export default function useContextMenu(
  setPopout: React$Node => void,
  setModal: React$Node => void,
  refresh: () => any
) {
  const [config: ?TwoDanceConfigs, setConfig] = useConfigs();
  const [userId, setUserId] = useState<number | null>(null);

  const onSelectRole = useMemo(
    () => async (role: Roles) => {
      if (userId !== null && config) {
        const userRole: UserRoleGroup = {
          vkUserId: userId,
          role
        };
        let roles = config.roles ? [...config.roles] : [];
        const index = roles.findIndex(r => r.vkUserId === userRole.vkUserId);
        if (index === -1) {
          roles = [...roles, userRole];
        } else {
          roles[index] = userRole;
        }
        await setConfig({ ...config, roles });
        setUserId(null);
        setModal(
          <ModalRoot activeModal={null}>
            <SelectRoleUserModal
              id="select-role-user"
              onClose={() => setUserId(null)}
              onSelect={onSelectRole}
            />
          </ModalRoot>
        );
        setTimeout(() => setModal(null), 1500)
      }
    },
    [config, setConfig, setModal, userId]
  );

  const onEdit = useMemo(
    () => () => {
      setModal(
        <ModalRoot activeModal="select-role-user">
          <SelectRoleUserModal
            id="select-role-user"
            onClose={() => setUserId(null)}
            onSelect={onSelectRole}
          />
        </ModalRoot>
      );
    },
    [onSelectRole, setModal]
  );

  const onDrop = useMemo(() => () => {
    if (userId !== null) {
      let roles = config.roles ? [...config.roles] : [];
      const index = roles.findIndex(r => r.vkUserId === userId);
      if (index > -1) {
        roles.splice(index, 1)
      }
      setConfig({...config, roles})
    }
  }, [config, setConfig, userId]);

  useEffect(() => {
    if (userId !== null) {
      setPopout(
        <ContextMenu onEdit={onEdit} onDrop={onDrop} onClose={() => setUserId(null)} />
      );
    } else {
      setPopout(null);
      refresh()
    }
  }, [onDrop, onEdit, refresh, setPopout, userId]);

  return [setUserId]
}
