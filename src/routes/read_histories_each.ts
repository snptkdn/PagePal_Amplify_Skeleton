import { get, writable, type Writable } from "svelte/store";
import { BackendHost } from "../store";

export interface ReadHistory {
  Book: {
    isbn: string,
    title: string,
    author: string, 
    image_url: string, 
    description: string,
    page_count: number
  },
  User: {
    Name: string
  }
  IsRead: boolean,
  Rate: number,
  Date: string
}

export default function(): [Writable<[]>, Writable<boolean>, Function] {
  const loading = writable(false);
  const data: Writable<[]> = writable([]);

  async function getReadHistories(userID: string) {
    loading.set(true);
    try {
      const response = await fetch(`${get(BackendHost)}/read_histories?user_id=${userID}`);
      data.set(await response.json());
    } catch (e) {
      console.log(e);
    }
    loading.set(false);
  }

  return [data, loading, getReadHistories];
}
