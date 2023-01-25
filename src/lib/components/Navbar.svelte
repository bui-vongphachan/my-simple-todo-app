<script lang="ts">
	import { goto } from '$app/navigation'; 
	import { PATH_TO_LOGIN } from '$lib/constants/pagePath';
	import { isAuthenticated } from '$lib/store/auth';
	import PageFade from './PageFade.svelte';

	async function logOut() {
		localStorage.removeItem('user');

		isAuthenticated.set(false);

		goto(PATH_TO_LOGIN);
	}
</script>

{#if !$isAuthenticated}
	<div />
{:else}
	<PageFade>
		<div class="  bg-green-500">
			<div class=" container m-auto">
				<div class="h-[70px] text-white flex justify-between items-center">
					<a href="/" class=" prose-xl">Simple Todo App</a>
					<div>
						<button class="hover:bg-green-600 bg-green-700 px-4 py-2 rounded-md" on:click={logOut}>
							Log out
						</button>
					</div>
				</div>
			</div>
		</div>
	</PageFade>
{/if}
