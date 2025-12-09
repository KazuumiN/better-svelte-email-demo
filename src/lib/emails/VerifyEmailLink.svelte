<script lang="ts">
	import {
		Body,
		Button,
		Container,
		Head,
		Heading,
		Hr,
		Html,
		Img,
		Link,
		Preview,
		Section,
		Text
	} from 'better-svelte-email';

	interface Props {
		appName?: string;
		appUrl?: string;
		logoUrl?: string;

		username?: string;
		verifyUrl?: string;
		expiresInMinutes?: number;

		supportEmail?: string;
	}

	let {
		appName = 'Acme',
		appUrl = 'http://localhost:5173',
		logoUrl,

		username = 'ユーザー',
		verifyUrl = `${appUrl}/verify-email?token=...`,
		expiresInMinutes = 30,

		supportEmail = 'support@example.com'
	}: Props = $props();

	const brandLogoUrl = $derived(logoUrl ?? `${appUrl}/logo.png`);
	const year = new Date().getFullYear();
	const previewText = $derived(`${appName}：メールアドレスの確認`);
</script>

<!-- Subject例: 【{appName}】メールアドレスを確認してください -->
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
				メールアドレスを確認してください
			</Heading>

			<Text class="m-0 mt-4 text-sm leading-6 text-gray-700">
				こんにちは {username} さん。{appName} のご利用を開始するには、以下のボタンからメールアドレスの確認を完了してください。
			</Text>

			<Section class="mt-6 text-center">
				<Button
					href={verifyUrl}
					pX={24}
					pY={14}
					class="rounded-lg bg-slate-900 text-sm font-semibold text-white no-underline"
				>
					メールアドレスを確認
				</Button>
			</Section>

			<Text class="m-0 mt-6 text-sm leading-6 text-gray-700">
				うまく開けない場合は、次のURLをコピーしてブラウザに貼り付けてください：
				<br />
				<Link href={verifyUrl} class="text-blue-600 no-underline">{verifyUrl}</Link>
			</Text>

			<Text class="m-0 mt-4 text-xs leading-5 text-gray-500">
				このリンクは {expiresInMinutes} 分後に無効になります。
			</Text>

			<Hr class="my-6 w-full border border-solid border-stone-200" />

			<Text class="m-0 text-xs leading-5 text-gray-500">
				このメールに心当たりがない場合は、何もせず無視してください。<br />
				お困りの際は
				<Link href={`mailto:${supportEmail}`} class="text-blue-600 no-underline">{supportEmail}</Link>
				までご連絡ください。
			</Text>

			<Text class="m-0 mt-6 text-center text-xs leading-5 text-gray-400">© {year} {appName}</Text>
		</Container>
	</Body>
</Html>
