// 2flow

import axios from "axios";

const baseUrl = "https://social-dance.site/api";

export async function getTickets(id?: string): Promise<Ticket[]> {
  if (id) {
    return (await axios.get(baseUrl + "/tickets/"+id)).data;
  } else {
    return (await axios.get(baseUrl + "/tickets")).data;
  }
}

export async function postTickets(ticket: $Rest<Ticket, {_id:string}>) {
  return (await axios.post(baseUrl + '/tickets', ticket)).data
}

export async function putTickets(ticket: Ticket) {
  await axios.put(baseUrl + '/tickets/'+ticket._id, ticket);
  return (await axios.get(baseUrl + '/tickets/'+ticket._id)).data;
}

export async function delTickets(event: Ticket) {
  return (await axios.delete(baseUrl+'/tickets/'+event._id)).data;
}