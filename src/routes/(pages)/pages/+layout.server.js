import { goto } from "$app/navigation";

export function load({ cookies }) {
	const id = cookies.get('id');

	return {
		id
	};
}
