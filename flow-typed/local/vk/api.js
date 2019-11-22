// @flow

declare type DatabaseGetCitiesResponse = {
  response: {
    count: number,
    items: VKCityType[]
  }
}

declare type DatabaseGetCitiesByIdResponse = {
  response: VKCityType[]
}
