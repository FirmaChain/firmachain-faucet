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

export function convertBigIntToString(obj: any): any {
	if (typeof obj === 'bigint') {
		return obj.toString() + 'n';
	} else if (Array.isArray(obj)) {
		return obj.map(convertBigIntToString);
	} else if (obj !== null && typeof obj === 'object') {
		return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, convertBigIntToString(v)]));
	}
	return obj;
}
