<script lang="ts">
	import { Icon } from 'svelte-ionicons';
	import { Modal, Toast, ProgressRadial } from '@skeletonlabs/skeleton';
	import {
		modalStore,
		toastStore,
		type ModalComponent,
		type ModalSettings,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import SignUpModal from '../components/SignUpModal.svelte';
	import fetchSignIn from '../signin';
	import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const userID = getCookie('id');
		if (userID) {
			goto('/pages/timeline')
		}
	});

	let t: ToastSettings = {
		message: 'ログインに成功しました！'
	};
  
	const [id, status, loading, signIn] = fetchSignIn();
	let userName = '';
	let password = '';

	const onSignIn = async () => {
		await signIn(userName, password);
		if ($status === 400) {
			t.message = 'ユーザー名またはパスワードが誤っています😂';
			toastStore.trigger(t);
		} else {
			setCookie('id', $id, 30, true);

			toastStore.trigger(t);
			goto('pages/timeline');
		}
	};

	const modalComponent: ModalComponent = {
		ref: SignUpModal
	};

	const signUpModal: ModalSettings = {
		type: 'component',
		title: '新規ユーザー登録',
		body: '新規のユーザー登録を行います。',
		buttonTextCancel: 'キャンセル',
		component: modalComponent
	};

	const openModal = () => {
		modalStore.trigger(signUpModal);
	};
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 flex flex-col items-center">
		<h2 class="h2">Welcome to PagePal.</h2>
		<label class="label w-9/12">
			<span>ID</span>
			<input class="input" type="text" placeholder="ID" bind:value={userName} />
		</label>
		<label class="label w-9/12 pt-4">
			<span>Password</span>
			<input class="input" type="password" placeholder="PASSWORD" bind:value={password} />
		</label>
		<div class="flex justify-center space-x-2">
			{#if $loading}
				<button class="btn variant-filled">
					<ProgressRadial width="w-5" stroke={70} />
				</button>
			{:else}
				<button class="btn variant-filled" on:click={onSignIn}>ログイン</button>
			{/if}
		</div>
		<div class="p-6 border-2 rounded-lg border-slate-600 flex flex-wrap justify-center">
			<Icon name="help-circle-outline" />
			<span class="pl-2"> アカウントを持っていませんか？ </span>
			<div class="w-full" />
			<div>
				<button class="mt-3 btn variant-filled flex" on:click={openModal}>新規登録</button>
			</div>
		</div>
	</div>
</div>

<Modal />
<Toast />

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite, glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
