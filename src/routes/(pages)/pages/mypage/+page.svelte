<script lang="ts">
	import BookLibrary from '../../../components/BookLibrary.svelte';
	import UserHeader from '../../../components/UserHeader.svelte';
	import BookLibraryList from '../../../components/BookLibraryList.svelte';
	import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';

	let data = {
		id: Number(getCookie('id'))
	};
</script>

<UserHeader {data} />

<div class="card mx-4 mb-4 p-4">
	<div class="text-left">
		<span>読みたい本</span>
	</div>
	<hr class="!border-t-2" />
	<BookLibrary {data} />
</div>

<div class="card mx-4 mb-4 p-4">
	<BookLibraryList {data} />
</div>
