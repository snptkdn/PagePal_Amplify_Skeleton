<script lang="ts">
	import fetchReadHistories from '../read_histories_each';
	import { ProgressBar, ProgressRadial } from '@skeletonlabs/skeleton';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import ReadHistoryCard from './ReadHistoryCard.svelte';
	import NoImage from '$lib/noimage.png';

	export let data;
	const [histories, loading, getReadHistories] = fetchReadHistories();
	let sorted: string = 'New';

	onMount(async () => {
		await getReadHistories(data.id);
    $histories = $histories.
      filter((history) => history.IsRead)
      .sort((a, b) => new Date(a.Date) < new Date(b.Date));
		page.size = $histories.length;
	});

	$: paginatedSource = $histories.slice(
		page.offset * page.limit, // start
		page.offset * page.limit + page.limit // end
	);

	const OnSortChange = () => {
		if (sorted === 'HighRate') {
			$histories = $histories.sort((a, b) => a.Rate < b.Rate);
		} else if (sorted === 'LowRate') {
			$histories = $histories.sort((a, b) => a.Rate > b.Rate);
		} else if (sorted === 'New') {
			$histories = $histories.sort((a, b) => new Date(a.Date) < new Date(b.Date));
		} else if (sorted === 'Old') {
			$histories = $histories.sort((a, b) => new Date(a.Date) > new Date(b.Date));
		} else if (sorted === 'ManyPage') {
			$histories = $histories.sort((a, b) => a.Book.page_count < b.Book.page_count);
		} else if (sorted === 'FewPage') {
			$histories = $histories.sort((a, b) => a.Book.page_count > b.Book.page_count);
		}
	};

	let page: PaginationSettings = {
		offset: 0,
		limit: 5,
		size: $histories.length,
		amounts: []
	};
</script>

{#if $loading}
	<div class="flex justify-center mt-12">
		<ProgressRadial class="w-11" />
	</div>
	{$histories}
{:else}
	<div class="grid grid-cols-2 items-center pb-1">
		<span>読んだ本</span>
		<div class="text-xs text-right">
			<span class="">Sorted by</span>
			<select class="select text-xs p-1 w-2/4" bind:value={sorted} on:change={OnSortChange}>
				<option value="HighRate">高評価</option>
				<option value="LowRate">低評価</option>
				<option value="New">新しい</option>
				<option value="Old">古い</option>
				<option value="ManyPage">ページ多い</option>
				<option value="FewPage">ページ少ない</option>
			</select>
		</div>
	</div>
	<hr class="!border-t-2" />
	<div>
		{#each paginatedSource as history}
			<div class="flex flex-row">
				<div class="w-2/12 m-1 flex">
				{#if history.Book.image_url}
					<img class="object-contain h-16 w-12 rounded-md" src={history.Book.image_url} />
				{:else}
					<img class="object-contain h-16 w-12 rounded-md" src={NoImage} />
				{/if}
				</div>
				<div class="w-10/12 flex flex-wrap">
					<div class="w-full flex items-center">
						<div>
							<span class="text-sm">{history.Book.title}</span>
						</div>
						<span class="text-right ml-2 p-0.5 chip text-xs variant-soft-tertiary">
							{history.Book.page_count}p
						</span>
					</div>
					<div class="w-full" />
					<span class="text-xs text-slate-500"> {history.Book.author} </span>
					<div class="w-full" />
					<div class="w-full flex flex-row items-center">
						<div class="w-10/12 mr-2">
							<ProgressBar value={history.Rate} max={100} meter="variant-filled-surface" />
						</div>
						<div class="">
							{history.Rate}
						</div>
					</div>
				</div>
			</div>
			<hr class="!border-dotted" />
		{/each}

		<Paginator
			class="mt-3"
			bind:settings={page}
			showFirstLastButtons={false}
			showPreviousNextButtons={true}
		/>
	</div>
{/if}
