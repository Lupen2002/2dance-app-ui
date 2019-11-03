// @flow
import axios from "axios";

const baseUrl = "https://social-dance.site/images/";

export async function uploadImage(file: File): Promise<string[]> {
  const data = new FormData();
  data.set('files', file);
  const headers = {'Content-Type': 'multipart/form-data' };
  return (await axios.post(baseUrl, data, {headers})).data
}
