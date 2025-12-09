<script lang="ts">
	import {
		Html,
		Head,
		Body,
		Preview,
		Container,
		Section,
		Row,
		Column,
		Heading,
		Text,
		Link,
		Button,
		Img,
		Hr
	} from 'better-svelte-email';

	interface Props {
		name?: string;
	}

	let { name = 'ゲスト' }: Props = $props();

	const previewText = $derived(`${name}さん、チュートリアル用の最小メールです`);
</script>

<Html lang="ja">
	<Head />

	<Body class="bg-[#f7f7f7] font-sans">
		<Preview preview={previewText} />

		<Container class="max-w-[480px] mx-auto my-5 bg-white p-5 rounded">
			
			<!-- ロゴ -->
			<Section class="text-center">
				<Img
					src="https://placehold.jp/40x40.png?text=Logo"
					width="40"
					height="40"
					alt="ロゴ"
					class="mx-auto"
				/>
			</Section>

			<!-- 見出し -->
			<Section>
				<Heading
					as="h1"
					class="text-xl text-center mt-6 mb-0 font-semibold text-slate-900"
				>
					こんにちは、{name} さん 👋
				</Heading>
			</Section>

			<!-- 本文 -->
			<Section>
				<Text class="text-[14px] leading-6 text-gray-700 mt-3">
					このメールは <strong>better-svelte-email</strong> の各コンポーネントを使った、
					最小チュートリアル用テンプレートです。
				</Text>
			</Section>

			<!-- Row / Column の例 -->
			<Section class="mt-4">
				<Row>
					<Column align="left">
						<Text class="text-xs text-gray-600">左カラム</Text>
					</Column>
					<Column align="right">
						<Text class="text-xs text-gray-600">右カラム</Text>
					</Column>
				</Row>
			</Section>

			<!-- ボタン -->
			<Section class="mt-6 text-center">
				<Button
					href="https://example.com"
					pX={16}
					pY={10}
					class="bg-black text-white text-[14px] rounded no-underline inline-block"
				>
					例のページを開く
				</Button>
			</Section>

			<!-- URLリンク -->
			<Section class="mt-3">
				<Text class="text-xs text-center text-gray-600">
					ボタンが押せない場合：
					<Link href="https://example.com" class="text-blue-600 no-underline">
						https://example.com
					</Link>
				</Text>
			</Section>

			<!-- 区切り線 -->
			<Hr class="my-6 border border-gray-200" />

			<!-- フッター -->
			<Section>
				<Text class="text-xs text-gray-500 text-center">
					このメールはチュートリアル目的で送信されています。
				</Text>
			</Section>
		</Container>
	</Body>
</Html>
