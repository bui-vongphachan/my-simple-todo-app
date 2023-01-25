<script lang="ts">
	import { goto } from '$app/navigation';
	import { ENDPOINT_FOR_LOGIN } from '$lib/constants/apiPath';
	import { isAuthenticated } from '$lib/store/auth';
	import axios from 'axios';

	let isSubmiting = false;

	let body = {
		username: '',
		password: ''
	};

	async function submit() {
		isSubmiting = true;

		await axios
			.post(import.meta.env.VITE_BACKEND_HOST + ENDPOINT_FOR_LOGIN, body)
			.then((response) => {
				localStorage.setItem('user', JSON.stringify(response.data));

				$isAuthenticated = true;

				goto('/');
			})
			.catch((error) => {
				alert(error.response.data.message);
			})
			.finally(() => {
				isSubmiting = false;
			});
	}
</script>

<div class="w-[500px] mx-auto mt-40 flex flex-col gap-4 bg-white px-8 py-12 rounded-md shadow-xl">
	<h1 class=" prose-2xl text-center">Login</h1>
	<form on:submit={submit} class="flex flex-col gap-4">
		<div>
			<label for="username" class=" block">Username</label>
			<input
				name="username"
				disabled={isSubmiting}
				bind:value={body.username}
				required
				class=" h-[50px] p-2 w-full border-2 rounded-md"
			/>
		</div>
		<div>
			<label for="password" class=" block">Password</label>
			<input
				disabled={isSubmiting}
				name="password"
				required
				bind:value={body.password}
				type="password"
				class=" h-[50px] p-2 w-full border-2 rounded-md"
			/>
		</div>
		<button
			class={`mt-4 transition-all duration-300 ${
				isSubmiting ? ' bg-slate-300' : ' bg-green-500 hover:bg-green-700'
			}  rounded-md p-2 text-white prose-lg `}
			type="submit">Confirm</button
		>
	</form>
</div>
