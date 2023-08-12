import { get, writable } from "svelte/store";
import { BackendHost } from "../store";

export default function() {
  const loading = writable(false);
  const data = writable({});

  async function getReadHistories() {
    loading.set(true);
    try {
      const response = await fetch(`${get(BackendHost)}/read_histories`);
      data.set(await response.json());
    } catch (e) {
      console.log(e);
    }
    loading.set(false);
  }

  getReadHistories();

  return [data, loading, getReadHistories];
}
