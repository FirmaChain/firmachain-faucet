import { createRoot } from 'react-dom/client';
import App from './App';

//? firmaJS: getHeader is not function error
declare global {
	interface FormData {
		getHeaders: () => { [key: string]: string };
	}
}

FormData.prototype.getHeaders = () => {
	return { 'Content-Type': 'multipart/form-data' };
};

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(<App />);
