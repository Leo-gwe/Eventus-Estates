<script>
	export let id = '';
</script>

<section id={id} {...$$restProps}>
	<slot />
</section>
