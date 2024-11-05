import Main from './screen/main';
import './App.css';
import { UtilProvider } from './context/utilContext';

function App() {
	return (
		<div className="App">
			<UtilProvider>
				<Main />
			</UtilProvider>
		</div>
	);
}

export default App;
