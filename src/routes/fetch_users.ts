import { get, writable } from "svelte/store";
import { BackendHost } from "../store";

export default function() {
  const loading = writable(false);
  const data = writable({});

  async function getUsers() {
    loading.set(true);
    try {
      const response = await fetch(`${get(BackendHost)}/users`);
      data.set(await response.json());
    } catch (e) {
      console.log(e);
    }
    loading.set(false);
  }

  getUsers();

  return [data, loading, getUsers];
}
