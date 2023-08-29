<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	// import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Most of your app wide CSS should be put in this file
	import '../../../app.postcss';
	import { page } from '$app/stores';
	import { Icon } from 'svelte-ionicons';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';


	onMount(() => {
		const userID = getCookie('id');
		if (!userID) {
			goto('/')
		}
	});
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<slot name="title">
					<strong class="text-xl uppercase"> PagePal </strong>
				</slot>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="footer">
		<div class="logo-cloud grid-cols-4">
			<a class="logo-item" href="/pages/timeline">
				<Icon name="home-sharp" />
			</a>
			<a class="logo-item" href="/pages/search">
				<Icon name="search-sharp" />
			</a>
			<a class="logo-item" href="/pages/users">
				<Icon name="people-sharp" />
			</a>
			<a class="logo-item" href="/pages/mypage">
				<Icon name="person-sharp" />
			</a>
		</div>
	</svelte:fragment>
</AppShell>
