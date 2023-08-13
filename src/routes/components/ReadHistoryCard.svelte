<script lang="ts">
	import { NoirLight, ProgressRadial } from '@skeletonlabs/skeleton';
	import { Icon } from 'svelte-ionicons';

  export let book: {
    title: string,
    image_url: string,
    page_count: number,
  };
  export let user: {
    Name: string,
  };
  export let date: Date;
  export let rate: number;

  console.log(user.Name);
  
</script>

<NoirLight />

<div class="card p-4 m-4">
	<div>
		<p class="text-left float-left text-surface-300">{user.Name}</p>
		<p class="text-right text-surface-300">{date.toLocaleString()}</p>
	</div>
	<div class="py-4 grid grid-cols-2">
		<div>
			<img
				class="rounded-lg block m-auto"
				src={book.image_url}
			/>
		</div>
		<div class="flex items-center justify-center flex-wrap">
			<ProgressRadial value={rate} width="w-28">{rate} POINT</ProgressRadial>
			<div class="w-full" />
			<button type="button" class="btn variant-filled-surface rounded-none p-2 w-full mt-3">
				<Icon name="bookmark-outline" />
				<span>読みたい</span>
			</button>
		</div>
	</div>
	<hr class="!border-t-2" />
	<p class="text-center pt-3">{book.title}</p>
</div>
