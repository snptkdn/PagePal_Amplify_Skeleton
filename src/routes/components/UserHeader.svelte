<script>
	import Icon from '$lib/octopus.jpg';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { fetchUser } from '../fetch_user';
  
	export let data;
	const [user, loading, getUser] = fetchUser();
  
	getUser(data.id);
  console.log($user);
</script>
<div class="card m-4 pr-4 py-4 flex flex-row">
	<div class="w-2/5 flex justify-center">
		<Avatar src={Icon} rounded="rounded-full" />
	</div>
	<div class="w-4/5">
		<div class="text-xl">
			<span>{$user.UserName}</span>
		</div>
		<div class="mt-2">
			<span class="badge variant-soft-secondary">{$user.TotalBooks} Books</span>
			<span class="badge variant-soft-tertiary">{$user.TotalPages} Pages</span>
		</div>
	</div>
</div>
