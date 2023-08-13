import { get, writable } from "svelte/store";
import { BackendHost } from "../store";

export default function() {
  const loading = writable(false);
  const data: {} = writable({});

  async function getReadHistories(query: string) {
    loading.set(true);
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      data.set(await response.json());
    } catch (e) {
      console.log(e);
    }
    loading.set(false);
  }

  return [data, loading, getReadHistories];
}
