<script>
	// No browser-only APIs here (SSR safe)
	import SectionWrapper from '../components/sectionWrapper.svelte';
	import { goto } from '$app/navigation';
</script>

<section class="relative min-h-[70vh] w-full overflow-hidden">
	<!-- Background image -->
	<img
		src="images/IMG_1410.jpeg"
		alt="Commercial property background"
		class="absolute inset-0 h-full w-full object-cover"
		loading="eager"
	/>

	<!-- Overlay -->
	<div class="absolute inset-0 bg-[#162E52]/70"></div>

	<!-- Content -->
	<div class="relative z-10 flex min-h-[70vh] items-center">
		<div class="mx-auto max-w-4xl px-6 text-center">
			<h1 class="text-4xl font-bold text-white sm:text-5xl">
				Welcome to <span class="text-yellow-400">Eventus Estates</span>
			</h1>

			<p class="mt-6 text-base text-white/90 sm:text-lg">
				Specialists in commercial and convenience store opportunities
				across the UK.
			</p>

			<div class="mt-8 flex justify-center">
				<a
					href="properties"
					class="inline-flex cursor-pointer items-center justify-center rounded-md
						   bg-yellow-400 px-8 py-3 font-semibold text-[#162E52]
						   transition hover:bg-white hover:text-[#162E52]
						   focus:outline-none focus:ring-2 focus:ring-yellow-400"
				>
					Explore Listings
				</a>
			</div>
		</div>
	</div>
</section>