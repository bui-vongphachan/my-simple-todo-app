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
	import PageFade from '$lib/components/PageFade.svelte';

	let data: Todo | null = null;
	let isFetching = true;
	let isSubmiting = false;

	onMount(async () => {
		if (!$isAuthenticated) return goto(PATH_TO_LOGIN);

		axios
			.get(import.meta.env.VITE_BACKEND_HOST + ENDPOINT_FOR_GETTING_A_TODO + $page.params.slug)
			.then((response) => {
				data = { ...response.data, items: response.data.todos };
			})
			.finally(() => {
				isFetching = false;
			});
	});

	async function updateStatus() {
		isSubmiting = true;

		const path =
			import.meta.env.VITE_BACKEND_HOST + ENDPOINT_FOR_GETTING_A_TODO + $page.params.slug;

		axios
			.patch(path, { completed: !data?.completed })
			.then((response) => {
				data = { ...response.data, items: response.data.todos };

				alert('Item was updated successfully');
			})
			.finally(() => {
				isSubmiting = false;
			});
	}
</script>

<svelte:head>
	<title>{data?.todo || 'Todo'} | My Simple Todo Application</title>
</svelte:head>

<div class=" mt-40">
	{#if isFetching}
		<Loading />
	{:else if !data}
		<h1 class=" text-center prose-2xl">Item not found</h1>
	{:else}
		<PageFade>
			<div class=" max-w-[400px] m-auto shadow-md p-4 rounded-md flex flex-col gap-8 bg-white">
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
		</PageFade>
	{/if}
</div>
