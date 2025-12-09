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
		resetCode?: string;
		expiresInMinutes?: number;
		resetUrl?: string;

		supportEmail?: string;
	}

	let {
		appName = 'Acme',
		appUrl = 'http://localhost:5173',
		logoUrl,

		username = 'ユーザー',
		resetCode = '123456',
		expiresInMinutes = 10,
		resetUrl = `${appUrl}/reset-password`,

		supportEmail = 'support@example.com'
	}: Props = $props();

	const brandLogoUrl = $derived(logoUrl ?? `${appUrl}/logo.png`);
	const year = new Date().getFullYear();
	const previewText = $derived(`${appName}：パスワード再設定コード ${resetCode}`);
</script>

<!-- Subject例: 【{appName}】パスワード再設定の認証コード -->
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
				パスワード再設定の認証コード
			</Heading>

			<Text class="m-0 mt-4 text-sm leading-6 text-gray-700">
				こんにちは {username} さん。以下の認証コードを入力して、パスワード再設定を続行してください。
			</Text>

			<Section class="mt-6">
				<Section class="rounded-xl border border-stone-200 bg-stone-50 px-4 py-5">
					<Text class="m-0 text-center text-3xl font-mono font-semibold tracking-[0.35em] text-slate-900">
						{resetCode}
					</Text>
				</Section>
			</Section>

			<Text class="m-0 mt-4 text-xs leading-5 text-gray-500">
				このコードは {expiresInMinutes} 分後に無効になります。
			</Text>

			<Section class="mt-6 text-center">
				<Button
					href={resetUrl}
					pX={24}
					pY={14}
					class="rounded-lg bg-slate-900 text-sm font-semibold text-white no-underline"
				>
					再設定ページを開く
				</Button>
			</Section>

			<Text class="m-0 mt-6 text-sm leading-6 text-gray-700">
				うまく開けない場合は、次のURLをコピーしてブラウザに貼り付けてください：
				<br />
				<Link href={resetUrl} class="text-blue-600 no-underline">{resetUrl}</Link>
			</Text>

			<Hr class="my-6 w-full border border-solid border-stone-200" />

			<Text class="m-0 text-xs leading-5 text-gray-500">
				この操作に心当たりがない場合は、何もせず無視してください。<br />
				心配な場合は <Link href={`mailto:${supportEmail}`} class="text-blue-600 no-underline">{supportEmail}</Link> までご連絡ください。
			</Text>

			<Text class="m-0 mt-6 text-center text-xs leading-5 text-gray-400">© {year} {appName}</Text>
		</Container>
	</Body>
</Html>
