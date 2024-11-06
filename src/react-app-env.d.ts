/// <reference types="react-scripts" />

//? firmaJS: getHeader is not function error
declare global {
	interface FormData {
		getHeaders: () => { [key: string]: string };
	}
}

FormData.prototype.getHeaders = () => {
	return { 'Content-Type': 'multipart/form-data' };
};
