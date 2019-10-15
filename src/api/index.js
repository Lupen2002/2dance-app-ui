// 2flow

import axios from "axios";

const baseUrl = "https://social-dance.site/api";

export async function getTickets(id?: string): Promise<Ticket[]> {
  if (id) {
    return (await axios.get(baseUrl + "/tickets/" + id)).data;
  } else {
    return (await axios.get(baseUrl + "/tickets")).data;
  }
}

export async function postTickets(ticket: $Rest<Ticket, { _id: string }>) {
  return (await axios.post(baseUrl + "/tickets", ticket)).data;
}

export async function putTickets(ticket: Ticket) {
  await axios.put(baseUrl + "/tickets/" + ticket._id, ticket);
  return (await axios.get(baseUrl + "/tickets/" + ticket._id)).data;
}

export async function delTickets(ticket: Ticket) {
  return (await axios.delete(baseUrl + "/tickets/" + ticket._id)).data;
}

export async function getConfigs(id?: string): Promise<Configs[]> {
  if (id) {
    return (await axios.get(baseUrl + "/configs/" + id)).data;
  } else {
    return (await axios.get(baseUrl + "/configs")).data;
  }
}

export async function postConfigs(config: $Rest<Configs, { _id: string }>) {
  return (await axios.post(baseUrl + "/configs", config)).data;
}

export async function putConfigs(config: Configs) {
  await axios.put(baseUrl + "/configs/" + config._id, config);
  return (await axios.get(baseUrl + "/configs/" + config._id)).data;
}

export async function delConfigs(config: Configs) {
  return (await axios.delete(baseUrl + "/configs/" + config._id)).data;
}

export async function getEvents(id?: string): Promise<DanceEvent[]> {
  if (id) {
    return (await axios.get(baseUrl + "/events/" + id)).data;
  } else {
    return (await axios.get(baseUrl + "/events")).data;
  }
}

export async function postEvents(obj: $Rest<DanceEvent, { _id: string }>) {
  return (await axios.post(baseUrl + "/events", obj)).data;
}

export async function putEvents(obj: DanceEvent) {
  await axios.put(baseUrl + "/events/" + obj._id, obj);
  return (await axios.get(baseUrl + "/events/" + obj._id)).data;
}

export async function delEvents(obj: DanceEvent) {
  return (await axios.delete(baseUrl + "/events/" + obj._id)).data;
}
