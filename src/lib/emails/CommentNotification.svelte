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
		postTitle?: string;

		commenterName?: string;
		commentExcerpt?: string;

		commentUrl?: string;
		notificationSettingsUrl?: string;

		supportEmail?: string;
	}

	let {
		appName = 'Acme',
		appUrl = 'http://localhost:5173',
		logoUrl,

		username = 'ユーザー',
		pageName = 'プロジェクト要件',
		postTitle = 'リリース手順の確認',

		commenterName = '佐藤花子',
		commentExcerpt = 'ここ、手順3の「権限」について補足です。管理者権限が必要なので…',

		commentUrl = `${appUrl}/pages/123#comment-456`,
		notificationSettingsUrl = `${appUrl}/settings/notifications`,

		supportEmail = 'support@example.com'
	}: Props = $props();

	const brandLogoUrl = $derived(logoUrl ?? `${appUrl}/logo.png`);
	const year = new Date().getFullYear();
	const previewText = $derived(`${commenterName}さんからコメントが届きました`);
</script>

<!-- Subject例: 【{appName}】{commenterName}さんがコメントしました -->
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
				新しいコメントがあります
			</Heading>

			<Text class="m-0 mt-4 text-sm leading-6 text-gray-700">
				こんにちは {username} さん。<strong>{commenterName}</strong> さんが、
				ページ「<strong>{pageName}</strong>」のあなたの書き込み「<strong>{postTitle}</strong>」にコメントしました。
			</Text>

			<Section class="mt-5 rounded-xl border border-stone-200 bg-stone-50 px-4 py-4">
				<Text class="m-0 text-xs font-semibold tracking-widest text-gray-500 uppercase">コメント</Text>
				<Text class="m-0 mt-2 text-sm leading-6 text-gray-700">“{commentExcerpt}”</Text>
			</Section>

			<Section class="mt-6 text-center">
				<Button
					href={commentUrl}
					pX={24}
					pY={14}
					class="rounded-lg bg-slate-900 text-sm font-semibold text-white no-underline"
				>
					コメントを見る
				</Button>
			</Section>

			<Text class="m-0 mt-6 text-sm leading-6 text-gray-700">
				うまく開けない場合は、次のURLをコピーしてブラウザに貼り付けてください：
				<br />
				<Link href={commentUrl} class="text-blue-600 no-underline">{commentUrl}</Link>
			</Text>

			<Hr class="my-6 w-full border border-solid border-stone-200" />

			<Text class="m-0 text-xs leading-5 text-gray-500">
				通知の設定は
				<Link href={notificationSettingsUrl} class="text-blue-600 no-underline">こちら</Link>
				から変更できます。<br />
				お困りの際は <Link href={`mailto:${supportEmail}`} class="text-blue-600 no-underline">{supportEmail}</Link> までご連絡ください。
			</Text>

			<Text class="m-0 mt-6 text-center text-xs leading-5 text-gray-400">© {year} {appName}</Text>
		</Container>
	</Body>
</Html>
