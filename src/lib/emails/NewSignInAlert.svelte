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

		signInTime?: string;
		device?: string;
		ipAddress?: string;
		location?: string;

		securityUrl?: string;
		resetPasswordUrl?: string;

		supportEmail?: string;
	}

	let {
		appName = 'Acme',
		appUrl = 'http://localhost:5173',
		logoUrl,

		username = 'ユーザー',

		signInTime = '2025-12-07 09:12',
		device = 'Chrome（macOS）',
		ipAddress = '127.0.0.1',
		location = 'Tokyo, Japan',

		securityUrl = `${appUrl}/settings/security`,
		resetPasswordUrl = `${appUrl}/reset-password`,

		supportEmail = 'support@example.com'
	}: Props = $props();

	const brandLogoUrl = $derived(logoUrl ?? `${appUrl}/logo.png`);
	const year = new Date().getFullYear();
	const previewText = $derived(`${appName}：新しいログインを検出しました`);
</script>

<!-- Subject例: 【{appName}】新しいログインを検出しました -->
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
				新しいログインを検出しました
			</Heading>

			<Text class="m-0 mt-4 text-sm leading-6 text-gray-700">
				こんにちは {username} さん。{appName} アカウントで新しいログインが確認されました。
				ご自身の操作であれば対応は不要です。
			</Text>

			<Section class="mt-5 rounded-xl border border-stone-200 bg-stone-50 px-4 py-4">
				<Text class="m-0 text-xs font-semibold tracking-widest text-gray-500 uppercase">詳細</Text>

				<Section class="mt-3">
					<Row>
						<Column class="w-[110px]">
							<Text class="m-0 text-xs text-gray-500">日時</Text>
						</Column>
						<Column>
							<Text class="m-0 text-sm text-slate-900">{signInTime}</Text>
						</Column>
					</Row>
					<Row>
						<Column class="w-[110px]">
							<Text class="m-0 text-xs text-gray-500">端末</Text>
						</Column>
						<Column>
							<Text class="m-0 text-sm text-slate-900">{device}</Text>
						</Column>
					</Row>
					<Row>
						<Column class="w-[110px]">
							<Text class="m-0 text-xs text-gray-500">IP</Text>
						</Column>
						<Column>
							<Text class="m-0 text-sm text-slate-900">{ipAddress}</Text>
						</Column>
					</Row>
					<Row>
						<Column class="w-[110px]">
							<Text class="m-0 text-xs text-gray-500">場所</Text>
						</Column>
						<Column>
							<Text class="m-0 text-sm text-slate-900">{location}</Text>
						</Column>
					</Row>
				</Section>
			</Section>

			<Section class="mt-6 text-center">
				<Button
					href={securityUrl}
					pX={24}
					pY={14}
					class="rounded-lg bg-slate-900 text-sm font-semibold text-white no-underline"
				>
					セキュリティを確認
				</Button>
			</Section>

			<Text class="m-0 mt-6 text-sm leading-6 text-gray-700">
				身に覚えがない場合は、すぐにパスワードを変更してください：
				<Link href={resetPasswordUrl} class="text-blue-600 no-underline">パスワードを変更</Link>
			</Text>

			<Hr class="my-6 w-full border border-solid border-stone-200" />

			<Text class="m-0 text-xs leading-5 text-gray-500">
				ヘルプが必要な場合は <Link href={`mailto:${supportEmail}`} class="text-blue-600 no-underline">{supportEmail}</Link> までご連絡ください。
			</Text>

			<Text class="m-0 mt-6 text-center text-xs leading-5 text-gray-400">© {year} {appName}</Text>
		</Container>
	</Body>
</Html>
