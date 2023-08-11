import { writable, get } from "svelte/store";
import { BackendHost } from "../store";

export default function() {
  const loading = writable(false);
  const status = writable(0)

  async function signUp(formData) {
    loading.set(true);
    try {
      const response = await fetch(`${get(BackendHost)}/signup`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(formData),
      });
      status.set(response.status)
    } catch (e) {
      console.log(e);
    }
    loading.set(false);
  }

  return [status, loading, signUp];
}
