<script>
	import { each } from 'svelte/internal';
	import ReadHistoryCard from '../../../components/ReadHistoryCard.svelte';
	import fetchReadHistories from '../../../read_histories';
	import { writable } from 'svelte/store';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	const [histories, loading, getReadHistories] = fetchReadHistories();

	getReadHistories();
</script>

{#if $loading}
	<div class="flex justify-center mt-12">
		<ProgressRadial class="w-11" />
	</div>
{:else}
	{#each $histories.reverse() as history}
		<ReadHistoryCard
			book={history.Book}
			user={history.User}
			date={new Date(history.CreatedAt)}
			rate={history.Rate}
		/>
	{/each}
{/if}
