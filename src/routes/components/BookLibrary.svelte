<script>
	import fetchReadHistories from '../read_histories_each';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let data;

	const [histories, loading, getReadHistories] = fetchReadHistories();

	getReadHistories(data.id);
</script>

{#if $loading}
	<div class="flex justify-center mt-12">
		<ProgressRadial class="w-11" />
	</div>
{:else}
	<div
		class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-2 md:py-10"
	>
		{#each $histories as history}
			<div class="snap-center shrink-0 py-2 w-20 md:w-40 text-center">
				<img class="rounded-lg block m-auto" src={history.Book.image_url} />
			</div>
		{/each}
	</div>
{/if}
