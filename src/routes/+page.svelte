<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import axios from 'axios';
	import type { Pagination, Todo } from '$lib/components/types';
	import Loading from '$lib/components/Loading.svelte';
	import { goto } from '$app/navigation';
	import { isAuthenticated } from '$lib/store/auth';
	import { PATH_TO_LOGIN } from '$lib/constants/pagePath';
	import { ENDPOINT_FOR_GETTING_TODOS } from '$lib/constants/apiPath';
	import { page } from '$app/stores';
	import Container from '$lib/components/Container.svelte';

	let isFetching = true;
	let pages = 1;

	export let data: Pagination<Todo> = {
		items: [],
		skip: parseInt($page.url.searchParams.get('skip') || '0') || 0,
		limit: parseInt($page.url.searchParams.get('limit') || '30') || 30,
		total: 0
	};

	async function doFetch(props: { limit?: number; skip?: number }) {
		isFetching = true;

		const { limit, skip } = props;

		let path = import.meta.env.VITE_BACKEND_HOST + ENDPOINT_FOR_GETTING_TODOS + '?';

		if (limit) path += `limit=${limit}&`;
		if (skip) path += `skip=${skip}&`;

		const response = await axios.get(path);

		data = { ...response.data, items: response.data.todos };
		pages = response.data.total / response.data.limit;

		isFetching = false;
	}

	onMount(async () => {
		if (!$isAuthenticated) return goto(PATH_TO_LOGIN);
	});

	const pageUnsubscriber = page.subscribe(async (props) => {
		await doFetch({
			limit: parseInt(props.url.searchParams.get('limit') || '30') || 30,
			skip: parseInt(props.url.searchParams.get('skip') || '0') || 0
		});
	});

	onDestroy(() => {
		pageUnsubscriber();
	});
</script>

<svelte:head>
	<title>Todos | My Simple Todo Application</title>
</svelte:head>

<Container>
	{#if isFetching}
		<Loading />
	{:else}
		<h1 class=" mb-4 prose-2xl">Todo list</h1>
		<hr class=" my-8" />
		<div class=" flex flex-col gap-8">
			<div class=" grid grid-cols-12 gap-[2rem]">
				{#each data.items as item}
					<a
						href="/todos/{item.id}"
						class="border-[1px] col-span-3 min-h-[100px] transition-all duration-300 rounded-md hover:shadow-md hover:cursor-pointer p-4"
					>
						<p class={item.completed ? ' text-green-500' : ''}>{item.todo}</p>
					</a>
				{/each}
			</div>
			<div class=" w-fit m-auto flex gap-4">
				{#each Array(pages) as _, index}
					<a
						href={`/?limit=${data.limit}&skip=${index * data.limit}`}
						class={`${
							data.skip === index * data.limit
								? ' bg-slate-300 cursor-default pointer-events-none'
								: ' bg-green-500 hover:bg-green-600'
						}  p-4 rounded-md text-white transition-all duration-300 block w-fit`}>{1 + index}</a
					>
				{/each}
			</div>
		</div>
	{/if}
</Container>
