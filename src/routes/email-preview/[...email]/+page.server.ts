import { emailList, createEmail } from 'better-svelte-email/preview';

export function load() {
	const emails = emailList({
		path: '/src/lib/emails'
	});

	return { emails };
}

export const actions = {
	...createEmail()
};