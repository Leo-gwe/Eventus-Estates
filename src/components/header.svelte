<script>
	let menuOpen = false;

	const links = [
		{ label: 'Home', href: '/Eventus-Estates/' },
		{ label: 'Properties', href: '/Eventus-Estates/properties' },
		{ label: 'Contact', href: '/Eventus-Estates/contact' }
	];

	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<header class="sticky top-0 z-50 bg-[#162E52]/90 backdrop-blur border-b border-white/10">
	<div class="mx-auto max-w-7xl px-6">
		<div class="flex h-16 items-center justify-between">
			<a
				href="/Eventus-Estates/"
				class="flex items-center gap-3"
			>
				<img
					src="/Eventus-Estates/images/IMG_0142_logo.jpeg"
					alt="Eventus Estates logo"
					class="h-10 w-10 rounded-full"
				/>
				<span class="font-semibold text-white">
					Eventus Estates
				</span>
			</a>

			<nav class="hidden md:flex gap-8">
				{#each links as link}
					<a
						href={link.href}
						class="text-white/80 transition hover:text-white"
					>
						{link.label}
					</a>
				{/each}
			</nav>

			<button
				class="md:hidden text-white"
				on:click={toggleMenu}
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			>
				<i class={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
			</button>
		</div>
	</div>

	{#if menuOpen}
		<nav class="md:hidden bg-[#162E52] px-6 py-4">
			{#each links as link}
				<a
					href={link.href}
					class="block py-2 text-white"
					on:click={() => (menuOpen = false)}
				>
					{link.label}
				</a>
			{/each}
		</nav>
	{/if}
</header>