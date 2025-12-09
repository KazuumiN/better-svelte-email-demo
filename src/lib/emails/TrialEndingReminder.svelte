<script lang="ts">
	import {
		Body,
		Button,
		Column,
		Container,
		Head,
		Heading,
		Hr,
		Html,
		Img,
		Link,
		Preview,
		Row,
		Section,
		Text
	} from 'better-svelte-email';

	type Item = { title: string; description: string };

	interface Props {
		appName?: string;
		appUrl?: string;
		logoUrl?: string;

		username?: string;
		trialEndsOn?: string;
		autoConvertToPaid?: boolean;

		upgradeUrl?: string;
		pricingUrl?: string;
		managePlanUrl?: string;

		supportEmail?: string;
	}

	let {
		appName = 'Acme',
		appUrl = 'http://localhost:5173',
		logoUrl,

		username = 'ユーザー',
		trialEndsOn = '2025-12-14',
		autoConvertToPaid = false,

		upgradeUrl = `${appUrl}/billing/upgrade`,
		pricingUrl = `${appUrl}/pricing`,
		managePlanUrl = `${appUrl}/billing`,

		supportEmail = 'support@example.com'
	}: Props = $props();

	const brandLogoUrl = $derived(logoUrl ?? `${appUrl}/logo.png`);
	const year = new Date().getFullYear();
	const previewText = $derived(`トライアルは ${trialEndsOn} に終了します`);

	const highlights: Item[] = [
		{ title: 'チーム共有', description: 'メンバー招待・権限管理などをスムーズに。' },
		{ title: '履歴と復元', description: '変更履歴の確認や復元で安心。' },
		{ title: '高度な権限', description: 'ワークスペースのセキュリティを強化。' }
	];
</script>

<!-- Subject例: 【{appName}】トライアル終了のお知らせ（{trialEndsOn}） -->
<Html lang="ja">
	<Head />
	<Body class="bg-stone-50 px-4 py-10 font-sans text-gray-800">
		<Preview preview={previewText} />
		<Container
			class="mx-auto w-full max-w-[520px] rounded-2xl border border-stone-200 bg-white px-6 py-10"
		>
			<Section class="text-center">
				<Img
					src={brandLogoUrl}
					width="40"
					height="40"
					alt={`${appName} ロゴ`}
					class="mx-auto"
				/>
			</Section>

			<Heading as="h1" class="mt-6 mb-2 text-center text-2xl font-semibold text-slate-900">
				トライアル終了のお知らせ
			</Heading>

			<Text class="m-0 mt-4 text-sm leading-6 text-gray-700">
				こんにちは {username} さん。{appName} のトライアルは <strong>{trialEndsOn}</strong> に終了します。
			</Text>

			{#if autoConvertToPaid}
				<Text class="m-0 mt-2 text-sm leading-6 text-gray-700">
					トライアル終了後、設定に応じて自動的に課金が開始される場合があります。内容は管理画面でご確認ください。
				</Text>
			{:else}
				<Text class="m-0 mt-2 text-sm leading-6 text-gray-700">
					トライアル終了後は、一部の機能が制限される場合があります。継続利用する場合はプランを選択してください。
				</Text>
			{/if}

			<Section class="mt-5 rounded-xl border border-stone-200 bg-stone-50 px-4 py-4">
				<Text class="m-0 text-xs font-semibold tracking-widest text-gray-500 uppercase">主なメリット</Text>

				<Section class="mt-3">
					{#each highlights as h, i}
						<Row>
							<Column valign="top" class="w-6">
								<Text as="span" class="m-0 text-lg leading-6 text-slate-700">✓</Text>
							</Column>
							<Column class={i < highlights.length - 1 ? 'pb-3' : undefined}>
								<Text class="m-0 text-sm font-semibold text-slate-900">{h.title}</Text>
								<Text class="m-0 mt-1 text-xs leading-5 text-gray-700">{h.description}</Text>
							</Column>
						</Row>
					{/each}
				</Section>
			</Section>

			<Section class="mt-6 text-center">
				<Button
					href={upgradeUrl}
					pX={24}
					pY={14}
					class="rounded-lg bg-slate-900 text-sm font-semibold text-white no-underline"
				>
					プランを選択する
				</Button>
			</Section>

			<Text class="m-0 mt-6 text-sm leading-6 text-gray-700">
				料金表：
				<Link href={pricingUrl} class="text-blue-600 no-underline">{pricingUrl}</Link>
				<br />
				管理画面：
				<Link href={managePlanUrl} class="text-blue-600 no-underline">{managePlanUrl}</Link>
			</Text>

			<Hr class="my-6 w-full border border-solid border-stone-200" />

			<Text class="m-0 text-xs leading-5 text-gray-500">
				ご不明点は <Link href={`mailto:${supportEmail}`} class="text-blue-600 no-underline">{supportEmail}</Link> までご連絡ください。
			</Text>

			<Text class="m-0 mt-6 text-center text-xs leading-5 text-gray-400">© {year} {appName}</Text>
		</Container>
	</Body>
</Html>
