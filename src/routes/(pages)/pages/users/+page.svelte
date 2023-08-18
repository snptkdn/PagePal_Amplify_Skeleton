<script>
	import { each } from 'svelte/internal';
	import ReadHistoryCard from '../../../components/ReadHistoryCard.svelte';
	import fetchUsers from '../../../fetch_users';
	import { writable } from 'svelte/store';
	import { Avatar, ProgressRadial } from '@skeletonlabs/skeleton';

	const [users, loading, _] = fetchUsers();
</script>

<nav class="list-nav">
	{#if $loading}
		<div class="flex justify-center mt-12">
			<ProgressRadial class="w-11" />
		</div>
	{:else}
		<ul>
			{#each $users as user}
				<li>
					<a href="/elements/lists">
						<Avatar initials={user.UserName} class="bg-secondary-500 w-8"/>
						<span class="flex-auto">{user.UserName}</span>
						<span class="badge variant-soft-secondary">{user.TotalBooks} Books</span>
						<span class="badge variant-soft-tertiary">{user.TotalPages} Pages</span>
					</a>
				</li>
				<hr class="!border-t-1 !border-dotted" />
			{/each}
		</ul>
	{/if}
</nav>
