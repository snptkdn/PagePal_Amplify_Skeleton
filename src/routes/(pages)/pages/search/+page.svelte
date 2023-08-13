<script lang="ts">
	import { each } from 'svelte/internal';
	import { writable } from 'svelte/store';
	import { Icon } from 'svelte-ionicons';
	import BookSearchCard from '../../../components/BookSearchCard.svelte';
	import fetchSearchBooks from '../../../serch_books';

	const [data, loading, searchBooks] = fetchSearchBooks();

	let input: string;

	async function onSearch() {
		console.log('invoked.');
		await searchBooks(input);
	}
</script>

<div class="flex m-2">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<button class="variant-filled" on:click={onSearch}>
			<Icon name="search-sharp" />
		</button>
		<input type="search" bind:value={input} placeholder="書籍タイトルや著者を入力..." />
	</div>
</div>

{#if $loading}
{:else if Array.isArray($data.items)}
	{#each $data.items as book}
		<BookSearchCard
			bookInfo={{
				title: book.volumeInfo?.title,
				image_url: book.volumeInfo?.imageLinks?.smallThumbnail,
				author: book.volumeInfo?.authors,
				page_count: book.volumeInfo?.pageCount,
				date: book.volumeInfo?.publishedDate
			}}
		/>
	{/each}
{/if}
