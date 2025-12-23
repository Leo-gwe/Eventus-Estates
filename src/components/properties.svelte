<script>
	import { onMount, onDestroy } from 'svelte';
	import SectionWrapper from './sectionWrapper.svelte';

	export let items = [];

	/* ===============================
	   IMAGES (STATIC, DEPLOYMENT SAFE)
	   =============================== */
	const DEFAULT_IMAGE = '/images/IMG_0142_logo.jpeg';

	const sampleItems = [
		{
			id: 'coventry-refitted',
			title: 'Newly Refitted Off-Licence – Coventry',
			price: 'Rent: £950 pcm (Ground Floor)',
			image: '/images/IMG_1410.jpeg',
			images: ['/images/IMG_1410.jpeg'],
			short: 'Newly refitted off-licence in a busy, well-established area.',
			details: `An exciting opportunity to take over a newly refitted off-licence situated in a busy and well-established area of Coventry.

Key Features:
• Newly refitted and ready to trade
• Spacious layout with modern fittings
• Large car park and easy access
• Low rent: £950 per month
• Strong growth potential`
		},
		{
			id: 'birmingham-leasehold',
			title: 'Leasehold Off-Licence – Birmingham',
			price: 'Leasehold',
			image: DEFAULT_IMAGE,
			images: [],
			short: 'Well-established off-licence with strong weekly sales.',
			details: `Weekly sales of approximately £5,000 with no local competition.

Key Features:
• Weekly sales: £5,000
• No competition nearby
• Ample parking
• Potential to franchise`
		},
		{
			id: 'derby-off-licence',
			title: 'Off-Licence – Derby',
			price: 'Rent: £660 pcm',
			image: DEFAULT_IMAGE,
			images: [],
			short: 'Low-rent off-licence with steady takings.',
			details: `Steady weekly takings of £4,000.

Key Features:
• Weekly sales: £4,000
• Rent: £660 pcm
• Parking available
• Growth potential`
		},
		{
			id: 'reading-freehold',
			title: 'Freehold Off-Licence for Sale – Reading',
			type: 'Commercial / Freehold',
			price: 'Freehold',
			sales: 'Weekly Sales: £5,000',
			location: 'Reading',
			tenure: 'Freehold',
			image: DEFAULT_IMAGE,
			images: [],
			short: 'Rare freehold off-licence opportunity.',
			details: `Freehold off-licence with steady weekly sales.

Key Features:
• Freehold
• Weekly sales: £5,000
• No competition
• Parking available`
		},
		{
			id: 'ipswich-franchise',
			title: 'Franchise Convenience Store – Ipswich',
			type: 'Franchise Convenience',
			price: 'Contact for price',
			sales: 'Weekly Sales: £19,000–£20,000',
			location: 'Ipswich',
			tenure: 'Franchise',
			image: DEFAULT_IMAGE,
			images: [],
			short: 'High-performing franchise store.',
			details: `Prime location franchise with strong footfall.

Key Features:
• Weekly sales: £19,000–£20,000
• No immediate competition
• Strong franchise support`
		},
		{
			id: 'chesterfield-convenience',
			title: 'Convenience Store with Accommodation – Chesterfield',
			type: 'Leasehold Convenience',
			price: 'Rent: £1,000 pcm',
			sales: 'Weekly Sales: £7,000',
			location: 'Chesterfield',
			tenure: 'Leasehold',
			image: DEFAULT_IMAGE,
			images: [],
			short: 'Store with 3-bed accommodation included.',
			details: `Weekly sales of £7,000 with residential accommodation.

Key Features:
• Weekly sales: £7,000
• 3-bedroom flat included
• High-demand location`
		}
	];

	let listings = [];
	let selected = null;
	let activeImageIndex = 0;

	/* ===============================
	   SCROLL LOCK (SSR SAFE)
	   =============================== */
	let originalOverflow = '';

	onMount(() => {
		listings = items.length ? items : sampleItems;
		originalOverflow = document.body.style.overflow;
	});

	function lockScroll() {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function unlockScroll() {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = originalOverflow;
		}
	}

	onDestroy(() => {
		unlockScroll();
	});

	/* ===============================
	   MODAL CONTROLS
	   =============================== */
	function openDetails(item) {
		selected = item;
		activeImageIndex = 0;
		lockScroll();
	}

	function closeDetails() {
		selected = null;
		unlockScroll();
	}

	function nextImage() {
		if (!selected?.images?.length) return;
		activeImageIndex = (activeImageIndex + 1) % selected.images.length;
	}

	function prevImage() {
		if (!selected?.images?.length) return;
		activeImageIndex =
			(activeImageIndex - 1 + selected.images.length) %
			selected.images.length;
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if (!selected) return;
		if (e.key === 'Escape') closeDetails();
		if (e.key === 'ArrowRight') nextImage();
		if (e.key === 'ArrowLeft') prevImage();
	}}
/>

<SectionWrapper class="relative my-16 px-6">
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each listings as item}
			<article class="group flex flex-col rounded-xl bg-white p-4 shadow transition hover:-translate-y-1 hover:shadow-lg">
				<div class="relative mb-3 overflow-hidden rounded-lg">
					<img
						src={item.image || DEFAULT_IMAGE}
						alt={item.title}
						class="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>

				<h3 class="text-lg font-semibold text-[#162E52] group-hover:text-yellow-500">
					{item.title}
				</h3>

				<p class="text-sm text-[#162E52]/80">
					{item.short}
				</p>

				<div class="mt-auto flex items-center justify-between pt-4">
					<span class="text-sm font-semibold text-yellow-500">
						{item.price}
					</span>

					<button
						type="button"
						class="inline-flex h-9 w-28 items-center justify-center rounded-md
							   bg-[#162E52] text-sm font-semibold text-white
							   transition hover:bg-yellow-400 hover:text-[#162E52]"
						on:click={() => openDetails(item)}
					>
						View details
					</button>
				</div>
			</article>
		{/each}
	</div>

	{#if selected}
		<!-- MODAL OVERLAY -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			on:click={closeDetails}
		>
			<!-- MODAL CONTENT -->
			<div
				class="relative w-full max-w-3xl rounded-xl bg-white p-6"
				role="document"
				tabindex="-1"
			>
				<img
					src={selected.images?.[activeImageIndex] || DEFAULT_IMAGE}
					alt={selected.title}
					class="mb-4 h-64 w-full rounded-lg object-cover"
				/>

				<h2 class="text-2xl font-bold text-[#162E52]">
					{selected.title}
				</h2>

				<p class="mt-3 whitespace-pre-line text-sm text-[#162E52]/90">
					{selected.details}
				</p>

				<!-- ENQUIRY -->
				<div class="mt-6 rounded-lg bg-[#F9FAFB] p-4">
					<h3 class="mb-2 font-semibold text-[#162E52]">
						Enquire about this property
					</h3>

					<div class="flex flex-col gap-3 sm:flex-row">
						<a
							href={`mailto:Eventus.estates@outlook.com?subject=Property enquiry: ${encodeURIComponent(
								selected.title
							)}`}
							class="inline-flex h-10 items-center justify-center rounded-md
								   bg-[#162E52] px-6 text-sm font-semibold text-white
								   transition hover:bg-yellow-400 hover:text-[#162E52]"
						>
							Email enquiry
						</a>

						<a
							href="https://www.instagram.com/eventus_estates/"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex h-10 items-center justify-center rounded-md
								   border px-6 text-sm font-semibold text-[#162E52]
								   transition hover:bg-[#162E52] hover:text-white"
						>
							Message on Instagram
						</a>
					</div>
				</div>

				<div class="mt-6 flex justify-end">
					<button
						type="button"
						class="rounded border px-5 py-2 text-sm text-[#162E52]
							   transition hover:bg-[#162E52] hover:text-white"
						on:click={closeDetails}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	{/if}
</SectionWrapper>
