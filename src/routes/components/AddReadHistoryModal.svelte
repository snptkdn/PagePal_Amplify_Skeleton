<script lang="ts">
	export let parent: any;
	export let title: string;
	export let author = '';
	export let pageCount = 0;
	export let publishedDate = '';
	export let isbn = [];
	export let image_url = '';

	let rating = 0;

	let today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	let day = today.getDate();

	import { modalStore, Stepper, Step, RangeSlider } from '@skeletonlabs/skeleton';
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import PostReadHistory from '../add_read_history';

	let t: ToastSettings = {
		message: '「読んだ」を登録しました！'
	};

	const [status, loading, postReadHistory] = PostReadHistory();

	function getISBN(): string {
		const isbn_confirm = isbn.find((i) => i.type === 'ISBN_13') || isbn.find((i) => i.type === 'ISBN_10') || isbn[0];
		return isbn_confirm.identifier;
	}

	const onSubmit = async () => {
		await postReadHistory(
			{
				isbn: getISBN(),
				title: title,
				author: author ? author[0] : '',
				page_count: pageCount,
        image_url: image_url,
			},
			1,
			new Date(year, month, day),
			rating
		);
		if ($status !== 200) {
			t = {
				message: 'エラーが発生しました😂'
			};
		} else {
			modalStore.close();
			toastStore.trigger(t);
		}
	};

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<Stepper
			buttonBackLabel={'戻る'}
			buttonNextLabel={'次へ'}
			buttonCompleteLabel={'登録する！'}
			stepTerm={'ステップ'}
			on:complete={onSubmit}
		>
			<Step>
				<svelte:fragment slot="header">書籍データに欠損はありませんか？</svelte:fragment>
				欠損がある場合は手動入力してください
				<div class="border p-3 mt-3 border-primary-700/50 rounded-lg">
					<label class="label">
						<span>タイトル</span>
						<input
							class="input read-only:text-gray-500"
							type="text"
							placeholder="タイトル"
							bind:value={title}
							readonly={title !== ''}
						/>
					</label>
					<label class="label">
						<span>著者</span>
						<input
							class="input read-only:text-gray-500"
							type="text"
							placeholder="著者"
							bind:value={author}
							readonly={author !== ''}
						/>
					</label>
					<label class="label">
						<span>ページ数</span>
						<input
							class="input read-only:text-gray-500"
							type="text"
							placeholder="ページ数"
							bind:value={pageCount}
							readonly={pageCount !== 0}
						/>
					</label>
					<label class="label">
						<span>出版日</span>
						<input
							class="input read-only:text-gray-500"
							type="text"
							placeholder="出版日"
							bind:value={publishedDate}
							readonly={publishedDate !== ''}
						/>
					</label>
				</div>
			</Step>
			<Step>
				<svelte:fragment slot="header">評価を入力してください</svelte:fragment>
				<div class="flex justify-center items-center my-24">
					{#if rating < 30}
						<span class="text-8xl text-error-900">{rating}</span>
					{:else if rating < 50}
						<span class="text-8xl text-error-500">{rating}</span>
					{:else if rating < 80}
						<span class="text-8xl text-warning-500">{rating}</span>
					{:else if rating < 90}
						<span class="text-8xl text-success-500">{rating}</span>
					{:else if rating < 95}
						<span class="text-8xl text-primary-500">{rating}</span>
					{:else}
						<span class="text-8xl text-secondary-500">{rating}</span>
					{/if}
				</div>
				<RangeSlider name="range-slider" bind:value={rating} max={100} step={1}>
					<div class="flex justify-between items-center">
						<div class="font-bold">評価</div>
						<div class="text-xs">{rating} / {100}</div>
					</div>
				</RangeSlider>
			</Step>
			<Step>
				<svelte:fragment slot="header">読んだ日付を入力してください</svelte:fragment>
				適当でもいいよ
				<div class="border p-3 mt-3 border-primary-700/50 rounded-lg">
					<label class="label mb-4">
						<span>年</span>
						<input class="input" type="number" placeholder="年" bind:value={year} />
					</label>
					<label class="label mb-4">
						<span>月</span>
						<input class="input" type="number" placeholder="月" bind:value={month} />
					</label>
					<label class="label mb-4">
						<span>日</span>
						<input class="input" type="number" placeholder="日" bind:value={day} />
					</label>
				</div>
			</Step>
		</Stepper>
	</div>
{/if}
