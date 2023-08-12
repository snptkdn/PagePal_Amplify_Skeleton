<script>
	import { each } from 'svelte/internal';
	import ReadHistoryCard from '../components/ReadHistoryCard.svelte';
	import fetchReadHistories from '../read_histories';
	import { writable } from 'svelte/store';

	const [data, loading, getReadHistories] = fetchReadHistories();

	getReadHistories();
</script>

{#if $loading}
	Loading: {$loading}
{:else}
	loaded!
	{#each $data as history}
		<ReadHistoryCard 
      book={history.Book}
      user={history.User}
      date={new Date(history.CreatedAt)}
      rate={history.Rate}
    />
	{/each}
{/if}
