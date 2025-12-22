<script>
	import { onMount, onDestroy } from 'svelte';
	import SectionWrapper from './sectionWrapper.svelte';

	const BASE = '/Eventus-Estates';

	const DEFAULT_IMAGE = `${BASE}/images/IMG_0142_logo.jpeg`;

	const listingsData = [
		{
			id: 'coventry',
			title: 'Newly Refitted Off-Licence – Coventry',
			price: '£950 pcm',
			image: `${BASE}/images/IMG_1410.jpeg`,
			short: 'Newly refitted off-licence in a busy, established area.',
			details: `Fully refurbished off-licence with modern fittings, ample parking, and excellent growth potential.

Low rent of £950 per month (ground floor).`
		},
		{
			id: 'birmingham',
			title: 'Leasehold Off-Licence – Birmingham',
			price: 'Weekly Sales £5,000',
			image: DEFAULT_IMAGE,
			short: 'Strong weekly sales with no competition nearby.',
			details: `Well-established leasehold business with consistent sales and scope to expand through longer hours.`
		}
		// You can safely add the rest later
	];

	let selected = null;
	let previousOverflow = '';

	onMount(() => {
		previousOverflow = document.body.style.overflow;
	});

	$: if (selected) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = previousOverflow;
	}

	onDestroy(() => {
		document.body.style.overflow = previousOverflow;
	});
</script>

<SectionWrapper class="relative py-20 px-6">
	<div
		class="absolute inset-0 bg-cover bg-center"
		style="background-image: url('{BASE}/images/PHOTO-2025-12-15-22-45-25-bg.jpg')"
	></div>

	<div class="absolute inset-0 bg-[#162E52]/85"></div>

	<div class="relative mx-auto max-w-6xl">
		<h1 class="mb-10 text-center text-3xl font-bold text-white">
			Available Properties
		</h1>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each listingsData as item}
				<article
					class="group flex flex-col rounded-xl bg-white p-4 shadow transition hover:-translate-y-1 hover:shadow-lg"
				>
					<img
						src={item.image}
						alt={item.title}
						class="mb-3 h-44 w-full rounded-lg object-cover transition group-hover:scale-105"
					/>

					<h3 class="text-lg font-semibold text-[#162E52]">
						{item.title}
					</h3>

					<p class="mt-1 text-sm text-[#162E52]/80">
						{item.short}
					</p>

					<div class="mt-auto flex items-center justify-between pt-4">
						<span class="text-sm font-semibold text-yellow-500">
							{item.price}
						</span>

						<button
							type="button"
							class="h-9 w-28 rounded-md bg-[#162E52] text-sm font-semibold text-white transition hover:bg-yellow-400 hover:text-[#162E52]"
							on:click={() => (selected = item)}
						>
							View details
						</button>
					</div>
				</article>
			{/each}
		</div>
	</div>

	{#if selected}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
			role="dialog"
			aria-modal="true"
			tabindex="0"
			on:click={() => (selected = null)}
			on:keydown={(e) => e.key === 'Escape' && (selected = null)}
		>
			<div
				class="w-full max-w-3xl rounded-xl bg-white p-6"
				role="document"
			>
				<h2 class="text-2xl font-bold text-[#162E52]">
					{selected.title}
				</h2>

				<p class="mt-4 text-sm whitespace-pre-line text-[#162E52]/90">
					{selected.details}
				</p>

				<div class="mt-6 rounded-lg bg-[#F9FAFB] p-4">
					<h3 class="text-lg font-semibold text-[#162E52]">
						Enquire about this property
					</h3>

					<div class="mt-4 flex flex-col gap-3 sm:flex-row">
						<a
							href={`mailto:Eventus.estates@outlook.com?subject=Property enquiry: ${selected.title}`}
							class="inline-flex h-10 items-center justify-center rounded-md bg-[#162E52] px-6 text-sm font-semibold text-white transition hover:bg-yellow-400 hover:text-[#162E52]"
						>
							Email enquiry
						</a>

						<a
							href="https://www.instagram.com/eventus_estates/"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex h-10 items-center justify-center rounded-md border border-[#162E52] px-6 text-sm font-semibold text-[#162E52] transition hover:bg-[#162E52] hover:text-white"
						>
							Message on Instagram
						</a>
					</div>
				</div>

				<div class="mt-6 flex justify-end">
					<button
						type="button"
						class="rounded border px-5 py-2 text-sm text-[#162E52] transition hover:bg-[#162E52] hover:text-white"
						on:click={() => (selected = null)}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	{/if}
</SectionWrapper>
