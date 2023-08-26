<script lang="ts">
	import fetchReadHistories from '../read_histories_each';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';

	export let data;

	const [histories, loading, getReadHistories] = fetchReadHistories();

	$: paginatedSource = $histories.slice(
		page.offset * page.limit, // start
		page.offset * page.limit + page.limit // end
	);

	let page: PaginationSettings = {
		offset: 0,
		limit: 10,
		size: $histories.length,
		amounts: []
	};

	getReadHistories(data.id);
</script>

{#if $loading}
	<div class="flex justify-center mt-12">
		<ProgressRadial class="w-11" />
	</div>
{:else}
	<div>
		{#each paginatedSource as number}
			{number}
		{/each}

		<Paginator bind:settings={page} showFirstLastButtons={false} showPreviousNextButtons={true} />
	</div>
{/if}
