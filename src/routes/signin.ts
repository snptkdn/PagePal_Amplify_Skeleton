import { writable, get } from "svelte/store";
import { BackendHost } from "../store";

export default function() {
  const loading = writable(false);
  const status = writable(0)
  const id = writable(0);

  async function signIn(userName: string, password: string) {
    const data = {
      user_name: userName,
      password: password
    };
    loading.set(true);
    try {
      const response = await fetch(`${get(BackendHost)}/signin`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
      });
      status.set(response.status)
      id.set(Number(await response.text()));
    } catch (e) {
      console.log(e);
    }
    loading.set(false);
  }

  return [id, status, loading, signIn];
}
