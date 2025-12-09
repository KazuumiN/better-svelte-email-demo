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

	interface Props {
		appName?: string;
		appUrl?: string;
		logoUrl?: string;

		username?: string;
		workspaceName?: string;

		planName?: string;
		amount?: string;
		currency?: string;
		paidAt?: string;

		invoiceId?: string;
		paymentMethod?: string;

		invoiceUrl?: string;
		manageBillingUrl?: string;

		supportEmail?: string;
	}

	let {
		appName = 'Acme',
		appUrl = 'http://localhost:5173',
		logoUrl,

		username = 'ユーザー',
		workspaceName = 'Acme Workspace',

		planName = 'Pro',
		amount = '1,980',
		currency = 'JPY',
		paidAt = '2025-12-07',

		invoiceId = 'INV-20251207-001',
		paymentMethod = 'Visa **** 4242',

		invoiceUrl = `${appUrl}/billing/invoices/${invoiceId}`,
		manageBillingUrl = `${appUrl}/billing`,

		supportEmail = 'support@example.com'
	}: Props = $props();

	const brandLogoUrl = $derived(logoUrl ?? `${appUrl}/logo.png`);
	const year = new Date().getFullYear();
	const previewText = $derived(`${appName}：お支払い完了（${amount} ${currency}）`);
</script>

<!-- Subject例: 【{appName}】領収書（{amount} {currency}） -->
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
				お支払いありがとうございます
			</Heading>

			<Text class="m-0 mt-4 text-sm leading-6 text-gray-700">
				こんにちは {username} さん。ワークスペース <strong>{workspaceName}</strong> のお支払いを受け付けました。
			</Text>

			<Section class="mt-5 rounded-xl border border-stone-200 bg-stone-50 px-4 py-4">
				<Text class="m-0 text-xs font-semibold tracking-widest text-gray-500 uppercase">お支払い内容</Text>

				<Section class="mt-3">
					<Row>
						<Column class="w-[140px]"><Text class="m-0 text-xs text-gray-500">請求書ID</Text></Column>
						<Column><Text class="m-0 text-sm text-slate-900">{invoiceId}</Text></Column>
					</Row>
					<Row>
						<Column class="w-[140px]"><Text class="m-0 text-xs text-gray-500">日付</Text></Column>
						<Column><Text class="m-0 text-sm text-slate-900">{paidAt}</Text></Column>
					</Row>
					<Row>
						<Column class="w-[140px]"><Text class="m-0 text-xs text-gray-500">プラン</Text></Column>
						<Column><Text class="m-0 text-sm text-slate-900">{planName}</Text></Column>
					</Row>
					<Row>
						<Column class="w-[140px]"><Text class="m-0 text-xs text-gray-500">お支払い方法</Text></Column>
						<Column><Text class="m-0 text-sm text-slate-900">{paymentMethod}</Text></Column>
					</Row>
					<Row>
						<Column class="w-[140px]"><Text class="m-0 text-xs text-gray-500">金額</Text></Column>
						<Column><Text class="m-0 text-sm font-semibold text-slate-900">{amount} {currency}</Text></Column>
					</Row>
				</Section>
			</Section>

			<Section class="mt-6 text-center">
				<Button
					href={invoiceUrl}
					pX={24}
					pY={14}
					class="rounded-lg bg-slate-900 text-sm font-semibold text-white no-underline"
				>
					領収書を表示
				</Button>
			</Section>

			<Text class="m-0 mt-6 text-sm leading-6 text-gray-700">
				請求設定の管理：
				<Link href={manageBillingUrl} class="text-blue-600 no-underline">{manageBillingUrl}</Link>
			</Text>

			<Hr class="my-6 w-full border border-solid border-stone-200" />

			<Text class="m-0 text-xs leading-5 text-gray-500">
				ご不明点は <Link href={`mailto:${supportEmail}`} class="text-blue-600 no-underline">{supportEmail}</Link> までご連絡ください。
			</Text>

			<Text class="m-0 mt-6 text-center text-xs leading-5 text-gray-400">© {year} {appName}</Text>
		</Container>
	</Body>
</Html>
