<script>
	import './layout.css';
	import Header from '../components/header.svelte';

	let { children } = $props();
</script>

<Header />

<main>
	{@render children()}
</main>

