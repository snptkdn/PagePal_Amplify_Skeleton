import { get, writable } from "svelte/store";
import { BackendHost } from "../store";

export default function() {
  const loading = writable(false);
  const data = writable({});

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
