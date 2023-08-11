<script lang="ts">
	export let parent: any;

	import { modalStore, ProgressRadial, Toast } from '@skeletonlabs/skeleton';
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import fetchSignUp from '../signup';

	const t: ToastSettings = {
		message: '新規登録が完了しました！'
	};

	const formData = {
		user_name: '',
		password: ''
	};

	const [status, loading, signUp] = fetchSignUp();
	let isInvalidName = false;
	let isInvalidPass = false;
	let isLessLengthName = false;

	const validateName = () => {
		if (formData.user_name.length < 1) {
			isLessLengthName = true;
			return false;
		} else {
			isLessLengthName = false;
			return true;
		}
	};

	const validatePassword = () => {
		if (formData.password.length < 5) {
			isInvalidPass = true;
			return false;
		} else {
			isInvalidPass = false;
			return true;
		}
	};

	const onFormSubmit = async () => {
		if (!validateName() || !validatePassword()) {
			return;
		}

		await signUp(formData);
		if ($status === 400) {
			isInvalidName = true;
		} else {
			modalStore.close();
			toastStore.trigger(t);
		}
	};

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		{#if !$loading}
			<!-- Enable for debugging: -->
			<form class="modal-form {cForm}">
				<label class="label">
					<span>ユーザー名</span>
					<input
						class="input"
						class:input-error={isInvalidName}
						on:input={validateName}
						type="text"
						bind:value={formData.user_name}
						placeholder="Enter id..."
					/>
					{#if isInvalidName}
						<span class="text-error-500"> 既に登録されているユーザー名です。 </span>
					{/if}
					{#if isLessLengthName}
						<span class="text-error-500"> ユーザー名は1文字以上で設定してください。 </span>
					{/if}
				</label>
				<label class="label">
					<span>パスワード</span>
					<input
						class="input"
						class:input-error={isInvalidPass}
						on:input={validatePassword}
						type="password"
						bind:value={formData.password}
						placeholder="Enter password..."
					/>
					{#if isInvalidPass}
						<span class="text-error-500"> パスワードは4文字以上で設定してください。 </span>
					{/if}
				</label>
			</form>
			<!-- prettier-ignore -->
			<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>登録する</button>
    </footer>
		{:else}
			<ProgressRadial />
		{/if}
	</div>
{/if}
