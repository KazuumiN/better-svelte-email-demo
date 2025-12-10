<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<div class="min-h-screen bg-slate-950 text-slate-50">
	<div class="mx-auto flex max-w-2xl flex-col gap-4 px-6 py-12">
		<header class="space-y-2">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Demo</p>
			<h1 class="text-3xl font-semibold leading-tight">Send the minimum email</h1>
		</header>

		{#if form?.success}
			<p class="rounded-lg border border-emerald-500/60 bg-emerald-900/60 px-4 py-3 text-emerald-50">
				Email sent successfully.
			</p>
		{:else if typeof form === 'string'}
			<p class="rounded-lg border border-red-500/60 bg-red-900/60 px-4 py-3 text-red-50">
				{form}
			</p>
		{/if}

		<form
			method="POST"
			class="space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-emerald-900/30"
			use:enhance
		>
			<div class="space-y-2">
				<label for="to" class="text-sm font-semibold text-slate-200">To</label>
				<input
					id="to"
					name="to"
					type="email"
					required
					placeholder="recipient@example.com"
					class="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
				/>
			</div>

			<div class="space-y-2">
				<label for="subject" class="text-sm font-semibold text-slate-200">Subject</label>
				<input
					id="subject"
					name="subject"
					type="text"
					required
					placeholder="A friendly hello"
					class="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
				/>
			</div>

			<div class="space-y-2">
				<label for="name" class="text-sm font-semibold text-slate-200">Name</label>
				<input
					id="name"
					name="name"
					type="text"
					required
					placeholder="Svelte Enthusiast"
					class="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
				/>
			</div>

			<button
				type="submit"
				class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 active:scale-[0.99]"
			>
				Send email
			</button>
		</form>
	</div>
</div>
