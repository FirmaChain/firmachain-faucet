export function revealKey(obfuscated: string): string {
	try {
		const restoredBase64 = Array.from(obfuscated)
			.map((char) => String.fromCharCode(char.charCodeAt(0) >> 1))
			.join('');
		return atob(restoredBase64);
	} catch (error) {
		console.error('The key is broken or something bad happend.', error);
		return '';
	}
}

export function obfuscateKey(original: string): string {
	try {
		const base64 = btoa(original);
		return Array.from(base64)
			.map((char) => String.fromCharCode(char.charCodeAt(0) << 1))
			.join('');
	} catch (error) {
		console.error('Failed to obfuscate key:', error);
		return '';
	}
}
