<script>
	import { filter, NoirLight, ProgressRadial } from '@skeletonlabs/skeleton';
	import { Icon } from 'svelte-ionicons';
</script>

<NoirLight />

<div class="card p-4 m-4">
	<div>
		<p class="text-left float-left text-surface-300">@snptkdn</p>
		<p class="text-right text-surface-300">2022/8/13 17:00</p>
	</div>
	<div class="py-4 grid grid-cols-2">
		<div>
			<img
				class="rounded-lg block m-auto"
				src="http://books.google.com/books/content?id=V2SzoQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
			/>
		</div>
		<div class="flex items-center justify-center flex-wrap">
			<ProgressRadial value={50} width="w-28">50 POINT</ProgressRadial>
			<div class="w-full" />
			<button type="button" class="btn variant-filled-surface rounded-none p-2 w-full mt-3">
				<Icon name="bookmark-outline" />
				<span>読みたい</span>
			</button>
		</div>
	</div>
	<hr class="!border-t-2" />
	<p class="text-center pt-3">未必のマクベス</p>
</div>
  
<div class="card p-4 m-4">
	<div>
		<p class="text-left float-left text-surface-300">@mike</p>
		<p class="text-right text-surface-300">2022/8/11 16:49</p>
	</div>
	<div class="py-4 grid grid-cols-2">
		<div>
			<img
				class="rounded-lg block m-auto"
				src="http://books.google.com/books/content?id=bW65zgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
			/>
		</div>
		<div class="flex items-center justify-center flex-wrap">
			<ProgressRadial value={94} width="w-28">94 POINT</ProgressRadial>
			<div class="w-full" />
			<button type="button" class="btn variant-filled-surface rounded-none p-2 w-full mt-3">
				<Icon name="bookmark-outline" />
				<span>読みたい</span>
			</button>
		</div>
	</div>
	<hr class="!border-t-2" />
	<p class="text-center pt-3">A COMMUNICATE</p>
</div>
  
<div class="card p-4 m-4">
	<div>
		<p class="text-left float-left text-surface-300">@snptkdn</p>
		<p class="text-right text-surface-300">2022/8/13 17:00</p>
	</div>
	<div class="py-4 grid grid-cols-2">
		<div>
			<img
				class="rounded-lg block m-auto"
				src="http://books.google.com/books/content?id=V2SzoQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
			/>
		</div>
		<div class="flex items-center justify-center flex-wrap">
			<ProgressRadial value={50} width="w-28">50 POINT</ProgressRadial>
			<div class="w-full" />
			<button type="button" class="btn variant-filled-surface rounded-none p-2 w-full mt-3">
				<Icon name="bookmark-outline" />
				<span>読みたい</span>
			</button>
		</div>
	</div>
	<hr class="!border-t-2" />
	<p class="text-center pt-3">未必のマクベス</p>
</div>
