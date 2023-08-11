<script lang="ts">
	export let parent: any;

	import { modalStore } from '@skeletonlabs/skeleton';

	const formData = {
		user_name: '',
		password: ''
	};

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>ユーザー名</span>
				<input class="input" type="text" bind:value={formData.user_name} placeholder="Enter id..." />
			</label>
			<label class="label">
				<span>パスワード</span>
				<input
					class="input"
					type="password"
					bind:value={formData.password}
					placeholder="Enter password..."
				/>
			</label>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>登録する</button>
    </footer>
	</div>
{/if}
