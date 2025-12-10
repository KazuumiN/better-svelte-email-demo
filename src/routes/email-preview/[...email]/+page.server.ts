import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';
import { emailList, createEmail, sendEmail } from 'better-svelte-email/preview';

const smtpPort = Number(env.SMTP_PORT) || 587;
const smtpSecure = env.SMTP_SECURE?.toLowerCase() === 'true' || smtpPort === 465;

type EmailPayload = {
	from: string;
	to: string;
	subject: string;
	html: string;
};

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

const customSendEmailFunction = async ({ to, subject, html }: EmailPayload) => {
	if (!transporter) {
		return {
			success: false,
			error: {
				message:
					'SMTP transport is not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASSWORD.'
			}
		};
	}

	try {
		const info = await transporter.sendMail({
			from: env.SMTP_FROM,
			to,
			subject,
			html
		});

		console.log('SMTP message sent', info.messageId);
		return { success: true, error: null };
	} catch (error) {
		console.error('Error sending email via SMTP:', error);
		return { success: false, error };
	}
};

export function load() {
	const emails = emailList({
		path: '/src/lib/emails'
	});

	return { emails };
}

export const actions = {
	...createEmail(),
	...sendEmail({ customSendEmailFunction })
};
