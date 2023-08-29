import { get, writable } from "svelte/store";
import { BackendHost } from "../store";

export default function() {
  const loading = writable(false);
  const data = writable({});
  let status = writable(0);
  let book_id = 0;

  async function fetchBook(isbn: string, bookInfo) {
    loading.set(true);
    try {
      const response = await fetch(`${get(BackendHost)}/books?isbn=${isbn}`);
      if (response.status === 404) {
        const response = await fetch(`${get(BackendHost)}/books`, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(bookInfo),
        });
        book_id = (await response.json()).ID;
        status.set(response.status);
      } else {
        book_id = (await response.json()).ID;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function postReadHistory(
    bookInfo,
    userID: number,
    date: Date,
    rate: number,
    is_read: boolean
  ) {
    await fetchBook(bookInfo.isbn, bookInfo);
    const formData = {
      book_id: book_id,
      user_id: userID,
      date: date,
      rate: rate,
      is_read: is_read
    };
    loading.set(true);
    try {
      const response = await fetch(`${get(BackendHost)}/read_histories`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(formData),
      });
      status.set(response.status);
    } catch (e) {
      console.log(e);
    }
    loading.set(false);
  }

  return [status, loading, postReadHistory];
}
