<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import type { Pagination, Todo } from '$lib/components/types';
	import Loading from '$lib/components/Loading.svelte';
	import { goto } from '$app/navigation';
	import { isAuthenticated } from '$lib/store/auth';
	import { PATH_TO_LOGIN } from '$lib/constants/pagePath';
	import { ENDPOINT_FOR_GETTING_TODOS } from '$lib/constants/apiPath';

	let isFetching = true;

	export let data: Pagination<Todo> = {
		items: [],
		total: 0,
		skip: 0,
		limit: 0
	};

	onMount(async () => {
		if (!$isAuthenticated) return goto(PATH_TO_LOGIN);

		const response = await axios.get(
			import.meta.env.VITE_BACKEND_HOST + ENDPOINT_FOR_GETTING_TODOS
		);

		data = { ...response.data, items: response.data.todos };

		isFetching = false;
	});
</script>

{#if isFetching}
	<Loading />
{:else}
	<h1 class=" mb-4">Todo, {data.total}</h1>
	<div class=" grid grid-cols-12 gap-[2rem]">
		{#each data.items as item}
			<a
				href="/todos/{item.id}"
				class="col-span-3 min-h-[100px] transition-all duration-300 rounded-md hover:shadow-md hover:cursor-pointer p-4"
			>
				<p class={item.completed ? ' text-green-500' : ''}>{item.todo}</p>
			</a>
		{/each}
	</div>
{/if}
