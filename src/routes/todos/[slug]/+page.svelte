<script lang="ts">
	import axios from 'axios';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { Todo } from '$lib/components/types';
	import Loading from '$lib/components/Loading.svelte';
	import { isAuthenticated } from '$lib/store/auth';
	import { goto } from '$app/navigation';
	import { PATH_TO_LOGIN } from '$lib/constants/pagePath';
	import { ENDPOINT_FOR_GETTING_A_TODO } from '$lib/constants/apiPath';

	let data: Todo | null = null;
	let isFetching = true;
	let isSubmiting = false;

	onMount(async () => {
		if (!$isAuthenticated) return goto(PATH_TO_LOGIN);

		const response = await axios.get(
			import.meta.env.VITE_BACKEND_HOST + ENDPOINT_FOR_GETTING_A_TODO + $page.params.slug
		);

		data = { ...response.data, items: response.data.todos };

		isFetching = false;
	});

	async function updateStatus() {
		isSubmiting = true;

		axios
			.patch(`https://dummyjson.com/todos/${$page.params.slug}`, {
				completed: !data?.completed
			})
			.then((response) => {
				data = { ...response.data, items: response.data.todos };

				alert('Item was updated successfully');
			})
			.finally(() => {
				isSubmiting = false;
			});
	}
</script>

{#if isFetching}
	<Loading />
{:else if !data}
	<h1>Item not found</h1>
{:else}
	<div class=" max-w-[400px] m-auto shadow-md p-4 rounded-md flex flex-col gap-8">
		<h1 class=" prose-lg">{data.todo}</h1>
		<button
			disabled={isSubmiting}
			on:click={updateStatus}
			class={` w-fit ${
				isSubmiting
					? ' bg-slate-400'
					: data.completed
					? 'bg-red-500 hover:bg-red-600'
					: 'bg-green-500 hover:bg-green-600'
			}  p-2 rounded-md text-white transition-all duration-300`}
		>
			{data.completed ? 'NOT COMPLETED' : 'COMPLETED'}
		</button>
	</div>
{/if}
