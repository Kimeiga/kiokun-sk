<!-- <script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style> -->
<script>
	import { onMount } from 'svelte';

	let searchQuery = '';
	let results = [];
	let dropdownVisible = false;

	const performSearch = async () => {
		try {
			const response = await fetch('/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ searchQuery })
			});
			results = await response.json();
			console.log(results);
			dropdownVisible = true;
		} catch (error) {
			console.error('Error performing search:', error);
		}
	};

	// ... rest of your component
</script>

<input type="text" bind:value={searchQuery} placeholder="Type to search" on:input={performSearch} />
<div class:show={dropdownVisible} class="dropdown-content">
	{#each results as { traditional, simplified, pinyin, definitions }}
		<div on:click={() => (window.location.href = `/${traditional}`)}>
			{traditional} - {simplified} - {pinyin.map(pinyinAddAccents).join(' ')} - {definitions.join(
				', '
			)}
		</div>
	{/each}
</div>
<button on:click={performSearch}>Search</button>

<style>
	/* Your styles go here */
	.dropdown-content {
		display: none;
		position: absolute;
		cursor: pointer;
	}

	.show {
		display: block;
	}
</style>
