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
		pageName?: string;
		workspaceName?: string;

		invitedByName?: string;
		invitedByEmail?: string;

		roleLabel?: string;
		message?: string;

		inviteUrl?: string;
		expiresInDays?: number;

		supportEmail?: string;
	}

	let {
		appName = 'Acme',
		appUrl = 'http://localhost:5173',
		logoUrl,

		username = 'ユーザー',
		pageName = 'プロジェクト要件',
		workspaceName = 'Design Team',

		invitedByName = '山田太郎',
		invitedByEmail = 'taro.yamada@example.com',

		roleLabel = '編集',
		message = '',

		inviteUrl = `${appUrl}/invites/page?token=...`,
		expiresInDays = 7,

		supportEmail = 'support@example.com'
	}: Props = $props();

	const brandLogoUrl = $derived(logoUrl ?? `${appUrl}/logo.png`);
	const year = new Date().getFullYear();
	const previewText = $derived(`${invitedByName}さんが「${pageName}」に招待しました`);
</script>

<!-- Subject例: 【{appName}】「{pageName}」への招待が届きました -->
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
				「{pageName}」への招待
			</Heading>

			<Text class="m-0 mt-4 text-sm leading-6 text-gray-700">こんにちは {username} さん。</Text>

			<Text class="m-0 mt-2 text-sm leading-6 text-gray-700">
				<strong>{invitedByName}</strong>（
				<Link href={`mailto:${invitedByEmail}`} class="text-blue-600 no-underline">{invitedByEmail}</Link>
				）が、ワークスペース <strong>{workspaceName}</strong> のページ「<strong>{pageName}</strong>」にあなたを招待しました。権限：<strong>{roleLabel}</strong>
			</Text>

			{#if message}
				<Section class="mt-5 rounded-xl border border-stone-200 bg-stone-50 px-4 py-4">
					<Text class="m-0 text-xs font-semibold tracking-widest text-gray-500 uppercase">メッセージ</Text>
					<Text class="m-0 mt-2 text-sm leading-6 text-gray-700">{message}</Text>
				</Section>
			{/if}

			<Section class="mt-6 text-center">
				<Button
					href={inviteUrl}
					pX={24}
					pY={14}
					class="rounded-lg bg-slate-900 text-sm font-semibold text-white no-underline"
				>
					招待を承諾する
				</Button>
			</Section>

			<Text class="m-0 mt-6 text-sm leading-6 text-gray-700">
				うまく開けない場合は、次のURLをコピーしてブラウザに貼り付けてください：
				<br />
				<Link href={inviteUrl} class="text-blue-600 no-underline">{inviteUrl}</Link>
			</Text>

			<Text class="m-0 mt-4 text-xs leading-5 text-gray-500">
				この招待は {expiresInDays} 日後に期限切れになります。
			</Text>

			<Hr class="my-6 w-full border border-solid border-stone-200" />

			<Text class="m-0 text-xs leading-5 text-gray-500">
				この招待に心当たりがない場合は、何もせず無視してください。<br />
				お困りの際は <Link href={`mailto:${supportEmail}`} class="text-blue-600 no-underline">{supportEmail}</Link> までご連絡ください。
			</Text>

			<Text class="m-0 mt-6 text-center text-xs leading-5 text-gray-400">© {year} {appName}</Text>
		</Container>
	</Body>
</Html>
