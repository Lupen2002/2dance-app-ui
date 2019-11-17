// @flow

/**
 * Общие события
 * https://vk.com/dev/vk_connect_events?f=1.%2B%D0%9E%D0%B1%D1%89%D0%B8%D0%B5%2B%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F
 */

/**
 * пол. Возможные значения: 1 — женский; 2 — мужской; 0 — пол не указан.
 */
declare type VKSexType = 0 | 1 | 2;

/**
 * информация о городе пользователя
 */
declare type VKCityType = {
  /** (integer) идентификатор города */
  id: number,
  /** (string) — название города */
  title: string
};

/**
 * информация о стране пользователя
 */
declare type VKCountryType = {
  /** (integer) идентификатор страны */
  id: number,
  /** (string) — название страны */
  title: string
};

/**
 * Доступные значения:
 * - friends — доступ к списку друзей пользователя,
 * - photos — доступ к фотографиям,
 * - video — доступ к видеозаписям,
 * - pages — доступ к wiki-страницам,
 * - status — доступ к статусу пользователя,
 * - notes — доступ к заметкам пользователя,
 * - wall — к методам работы со стеной,
 * - docs — доступ к документам,
 * - groups — доступ к сообществам пользователя,
 * - stats — доступ к статистике групп и приложений пользователя, администратором которых он является,
 * - market — доступ к товарам.
 */
declare type ScopeType =
  | "friends"
  | "photos"
  | "video"
  | "pages"
  | "status"
  | "notes"
  | "wall"
  | "docs"
  | "groups"
  | "stats"
  | "market";

/**
 * Включение уведомлений
 */

declare type VKWebAppDefaultSuccess = {
  type:
    | "VKWebAppAllowNotificationsResult"
    | "VKWebAppAddToFavoritesResult"
    | "VKWebAppCopyTextResult"
    | "VKWebAppAllowNotificationsResult",
  data: {
    result: boolean
  }
};

declare type VKWebAppDefaultFailed = {
  type:
    | "VKWebAppAllowNotificationsFailed"
    | "VKWebAppAddToFavoritesFailed"
    | "VKWebAppCopyTextFailed"
    | "VKWebAppOpenCodeReaderFailed",
  data: {
    error_type: string,
    error_data: any
  }
};

/**
 * Сканирование QR-кода
 * https://vk.com/dev/vk_connect_events_3?f=%D0%A1%D0%BA%D0%B0%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20QR-%D0%BA%D0%BE%D0%B4%D0%B0
 */

declare type VKWebAppOpenCodeReaderResult = {
  type: "VKWebAppOpenCodeReaderResult",
  data: {
    code_data: string
  }
};

/**
 * Копирование текста в буфер обмена
 * https://vk.com/dev/vk_connect_events_4?f=%D0%9A%D0%BE%D0%BF%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%B0%20%D0%B2%20%D0%B1%D1%83%D1%84%D0%B5%D1%80%20%D0%BE%D0%B1%D0%BC%D0%B5%D0%BD%D0%B0
 */

declare type VKWebAppCopyTextReq = {
  text: string
};

/**
 * Получение данных профиля
 * https://vk.com/dev/vk_connect_events_5?f=%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F
 */

declare type VKWebAppGetUserInfoResult = {
  type: "VKWebAppGetUserInfoResult",
  data: {
    id: number,
    first_name: string,
    last_name: string,
    sex: VKSexType,
    city: VKCityType,
    country: VKCountryType,
    /** дата рождения. Возвращается в формате D.M.YYYY или D.M (если год рождения скрыт). Если дата рождения скрыта целиком, поле отсутствует в ответе. */
    bdate?: string,
    photo_100: string,
    photo_200: string,
    timezone: number
  }
};

/**
 *
 */
declare type VKWebAppAccessTokenReceived = {
  "type": "VKWebAppAccessTokenReceived",
  "data": {
    "access_token": string,
    "scope": ScopeType[]
  }
}

declare type VKWebAppCallAPIMethodResult<T> = {
  "type":"VKWebAppCallAPIMethodResult",
  "data": T
}
