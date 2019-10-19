// @flow

import {useState, useEffect} from 'react'

type GuestInfo = {
  user: VKUser,
  isVisit: boolean
};
const headers = "имя, фамилия, пол, ссылка на страницу\n";
//имя, фамилия, пол, ссылка на страницу
export default function useGuestsCSV(guests: ?GuestInfo[]) {
  const [csv,setCSV] = useState<string>('');

  useEffect(() => {
    if (guests) {
      const data = headers + guests
        .map( ({user, isVisit}) => (user.first_name+','+user.last_name+','+user.sex+',https://vk.com/id'+user.id))
        .join("\n");
      setCSV(data)
    }
  }, [guests]);

  return csv
}