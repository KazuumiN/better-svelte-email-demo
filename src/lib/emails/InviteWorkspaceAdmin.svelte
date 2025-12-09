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

	type Permission = { title: string; description: string };

	interface Props {
		appName?: string;
		appUrl?: string;
		logoUrl?: string;

		username?: string;
		workspaceName?: string;

		invitedByName?: string;
		invitedByEmail?: string;

		inviteUrl?: string;
		expiresInDays?: number;

		inviteFromIp?: string;
		inviteFromLocation?: string;

		supportEmail?: string;
	}

	let {
		appName = 'Acme',
		appUrl = 'http://localhost:5173',
		logoUrl,

		username = 'ユーザー',
		workspaceName = 'Acme Workspace',

		invitedByName = '山田太郎',
		invitedByEmail = 'taro.yamada@example.com',

		inviteUrl = `${appUrl}/invites/workspace-admin?token=...`,
		expiresInDays = 7,

		inviteFromIp = '127.0.0.1',
		inviteFromLocation = 'Tokyo, Japan',

		supportEmail = 'support@example.com'
	}: Props = $props();

	const brandLogoUrl = $derived(logoUrl ?? `${appUrl}/logo.png`);
	const year = new Date().getFullYear();
	const previewText = $derived(`管理者として「${workspaceName}」に招待されています`);

	const permissions: Permission[] = [
		{
			title: 'メンバー管理',
			description: '招待・削除・権限変更など、メンバー周りの操作が可能です。'
		},
		{
			title: '請求とプラン',
			description: 'プラン変更や支払い方法の更新、請求情報の確認が可能です。'
		},
		{
			title: 'ワークスペース設定',
			description: 'セキュリティ・統合・各種設定の変更が可能です。'
		}
	];
</script>

<!-- Subject例: 【{appName}】「{workspaceName}」管理者への招待 -->
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
				管理者への招待
			</Heading>

			<Text class="m-0 mt-4 text-sm leading-6 text-gray-700">
				こんにちは {username} さん。
			</Text>

			<Text class="m-0 mt-2 text-sm leading-6 text-gray-700">
				<strong>{invitedByName}</strong>（
				<Link href={`mailto:${invitedByEmail}`} class="text-blue-600 no-underline">{invitedByEmail}</Link>
				）が、ワークスペース <strong>{workspaceName}</strong> に<strong>管理者</strong>としてあなたを招待しました。
			</Text>

			<Section class="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4">
				<Text class="m-0 text-sm font-semibold text-amber-900">管理者権限に含まれる主な操作</Text>

				<Section class="mt-3">
					{#each permissions as p, i}
						<Row>
							<Column valign="top" class="w-6">
								<Text as="span" class="m-0 text-lg leading-6 text-amber-700">•</Text>
							</Column>
							<Column class={i < permissions.length - 1 ? 'pb-3' : undefined}>
								<Text class="m-0 text-sm font-semibold text-slate-900">{p.title}</Text>
								<Text class="m-0 mt-1 text-xs leading-5 text-gray-700">{p.description}</Text>
							</Column>
						</Row>
					{/each}
				</Section>
			</Section>

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
				この招待は {expiresInDays} 日後に期限切れになります。招待は <strong>{inviteFromIp}</strong>（{inviteFromLocation}）から送信されました。
			</Text>

			<Hr class="my-6 w-full border border-solid border-stone-200" />

			<Text class="m-0 text-xs leading-5 text-gray-500">
				身に覚えがない場合は、何もせず無視してください。安全が心配な場合は
				<Link href={`mailto:${supportEmail}`} class="text-blue-600 no-underline">{supportEmail}</Link>
				までご連絡ください。
			</Text>

			<Text class="m-0 mt-6 text-center text-xs leading-5 text-gray-400">© {year} {appName}</Text>
		</Container>
	</Body>
</Html>
