<script>
  import {Icon } from "svelte-ionicons";
</script>
<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 flex flex-col items-center">
		<h2 class="h2">Welcome to PagePal.</h2>
		<label class="label w-9/12">
			<span>ID</span>
			<input class="input" type="text" placeholder="ID" />
		</label>
		<label class="label w-9/12 pt-4">
			<span>Password</span>
			<input class="input" type="password" placeholder="PASSWORD" />
		</label>
		<div class="flex justify-center space-x-2">
			<button class="btn variant-filled">ログイン</button>
		</div>
		<div class="p-6 border-2 rounded-lg border-slate-600 flex flex-wrap justify-center">
      <Icon name="help-circle-outline" />
      <span class="pl-2"> アカウントを持っていませんか？ </span>
			<div class="w-full" />
			<div>
				<button class="mt-3 btn variant-filled flex">新規登録</button>
			</div>
		</div>
	</div>
</div>

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
