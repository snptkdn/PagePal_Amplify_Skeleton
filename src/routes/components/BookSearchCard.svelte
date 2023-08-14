<script lang="ts">
	import {
		NoirLight,
		Modal,
		type ModalComponent,
		type ModalSettings,
		modalStore
	} from '@skeletonlabs/skeleton';
	import { Icon } from 'svelte-ionicons';
	import AddReadHistoryModal from './AddReadHistoryModal.svelte';

	export let bookInfo: {
		title: string;
		image_url: string;
		author: string;
		page_count: number;
		date: Date;
    industryIdentifiers: [];
	};

	const modalComponent: ModalComponent = {
		ref: AddReadHistoryModal,
		props: {
			title: bookInfo.title,
			author: bookInfo.author,
      pageCount: bookInfo.page_count,
      publishedDate: bookInfo.date,
      image_url: bookInfo.image_url,
      isbn: bookInfo.industryIdentifiers
		}
	};

	const addReadHistoryModal: ModalSettings = {
		type: 'component',
		title: '書籍の登録',
		body: '書籍の登録を行います',
		buttonTextCancel: 'キャンセル',
		component: modalComponent
	};

	const openModal = () => {
		modalStore.trigger(addReadHistoryModal);
	};
</script>

<NoirLight />

<div class="card p-4 m-4">
	<p class="text-center pb-3 text-xs break-words">{bookInfo.title}</p>
	<hr class="!border-t-2" />
	<div class="py-4 grid grid-cols-2">
		<div>
			<img class="rounded-lg block m-auto" src={bookInfo.image_url} />
		</div>
		<div class="flex items-center justify-center flex-wrap">
			<div class="w-full" />
			<div class="flex mr-auto mb-1">
				<span class="chip variant-filled p-1">著者</span>
				<span class="pl-2">{bookInfo.author ?? '-'}</span>
			</div>
			<div class="w-full" />
			<div class="flex mr-auto mb-1">
				<span class="chip variant-filled p-1">ページ数</span>
				<span class="pl-2">{bookInfo.page_count ?? '-'}</span>
			</div>
			<div class="w-full" />
			<div class="w-full" />
			<div class="flex mr-auto">
				<span class="chip variant-filled p-1">出版日</span>
				<span class="pl-2">{bookInfo.date ?? '-'}</span>
			</div>
			<div class="w-full" />
			<button
				type="button"
				class="btn variant-filled-surface rounded-none p-2 w-full mt-3"
				on:click={openModal}
			>
				<Icon name="book-outline" />
				<span>読んだ</span>
			</button>
		</div>
	</div>
</div>

<Modal />
