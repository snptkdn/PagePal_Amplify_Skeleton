import { get, writable, type Writable } from "svelte/store";
import { BackendHost } from "../store";

export class User {
  UserID: string;
  UserName: string;
  TotalBooks: number;
  TotalPages: number;
}

 export function fetchUser(): [Writable<User>, Writable<boolean>, Function]  {
  const loading = writable(false);
  const data: Writable<User> = writable(new User());

  async function getUsers(userID: string) {
    loading.set(true);
    try {
      const response = await fetch(`${get(BackendHost)}/users?user_id=${userID}`);
      data.set(await response.json());
    } catch (e) {
      console.log(e);
    }
    loading.set(false);
  }

  return [data, loading, getUsers];
}
