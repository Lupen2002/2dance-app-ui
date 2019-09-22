// @flow

const urlParams = new URLSearchParams(document.location.search);

const defaultState: StartParams = {
  vk_user_id: urlParams.get("vk_user_id"),
  vk_app_id: urlParams.get("vk_app_id"),
  vk_is_app_user: urlParams.get("vk_is_app_user"),
  vk_are_notifications_enabled: urlParams.get(
    "vk_are_notifications_enabled"
  ),
  vk_language: urlParams.get("vk_language"),
  vk_ref: urlParams.get("vk_ref"),
  vk_access_token_settings: urlParams.get("vk_access_token_settings"),
  vk_group_id: urlParams.get("vk_group_id"),
  vk_viewer_group_role: urlParams.get("vk_viewer_group_role"),
  vk_platform: urlParams.get("vk_platform"),
  sign: urlParams.get("sign")
};

export const startParamsReducer = (state: StartParams = defaultState) => state;