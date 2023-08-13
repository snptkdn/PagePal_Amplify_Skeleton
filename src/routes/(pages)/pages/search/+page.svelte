<script lang="ts">
	import { each } from 'svelte/internal';
	import { writable } from 'svelte/store';
	import { Icon } from 'svelte-ionicons';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
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
	<div class="flex justify-center mt-12">
		<ProgressRadial class="w-11" />
	</div>
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
{:else}
	<div class="flex justify-center flex-wrap">
		<Icon class="mt-10 text-slate-400" name="book-outline" width="80" height="80" />
		<div class="w-full" />
		<span class="my-5 text-slate-400">書籍を探しましょう！</span>
		<div class="w-full" />
		<div class="border border-dashed p-4 border-slate-700 border-2 rounded-lg">
			<div class="flex">
				<Icon class="text-slate-400" name="help-circle-outline" />
				<span class="ml-1 text-slate-400">書籍が見つかりませんか？</span>
			</div>
			<div class="w-full" />
			<div class="flex mt-3 justify-center">
				<button type="button" class="chip variant-ghost">
					<Icon class="text-slate-400" name="add-circle-outline" />
					<span>手動で登録する</span>
				</button>
			</div>
		</div>
	</div>
{/if}
