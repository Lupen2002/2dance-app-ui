// @flow

declare type StartParams = {
  vk_user_id: ?string,
  vk_app_id: ?string,
  vk_is_app_user: ?string,
  vk_are_notifications_enabled: ?string,
  vk_language: ?string,
  vk_ref: ?string,
  vk_access_token_settings: ?string,
  vk_group_id: ?string,
  vk_viewer_group_role: "none" | "member" | "moder" | "editor" | "admin" | void,
  vk_platform: ?string,
  sign: ?string,
  group_id?: string,
  ticket_id?: string
};
