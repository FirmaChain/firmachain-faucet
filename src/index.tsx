import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

//? firmaJS: getHeader is not function error
declare global {
	interface FormData {
		getHeaders: () => { [key: string]: string };
	}
}

FormData.prototype.getHeaders = () => {
	return { 'Content-Type': 'multipart/form-data' };
};

const persistor = persistStore(store);

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
);
