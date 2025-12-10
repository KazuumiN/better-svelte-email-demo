import Renderer, { toPlainText } from 'better-svelte-email/render';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';
import Minimum from '$lib/emails/Minimum.svelte';
import { fail } from '@sveltejs/kit';

const smtpPort = Number(env.SMTP_PORT) || 587;
const smtpSecure = env.SMTP_SECURE?.toLowerCase() === 'true' || smtpPort === 465;

const transporter = env.SMTP_HOST
	? nodemailer.createTransport({
			host: env.SMTP_HOST,
			port: smtpPort,
			secure: smtpSecure,
			auth:
				env.SMTP_USER && env.SMTP_PASSWORD
					? { user: env.SMTP_USER, pass: env.SMTP_PASSWORD }
					: undefined
		})
	: null;

export const actions = {
	default: async ({ request }) => {
		if (!transporter) {
			return fail(
				500,
				'SMTP transport is not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASSWORD.'
			);
		}
		const formData = await request.formData();
		const to = formData.get('to') as string;
		const subject = formData.get('subject') as string;
		const name = formData.get('name') as string;

		const renderer = new Renderer();
		const html = await renderer.render(Minimum, {
			props: { name }
		});
		const text = toPlainText(html);

		try {
			const info = await transporter.sendMail({
				from: env.SMTP_FROM,
				to,
				subject,
				text,
				html
			});

			console.log('SMTP message sent', info.messageId);
			return { success: true };
		} catch (error) {
			console.error('Error sending email via SMTP:', error);
			return fail(500, 'Error sending email.');
		}
	}
};
