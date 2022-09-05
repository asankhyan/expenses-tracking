import { Provider} from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/dashboard/dashboard.component';

function App() {
  return (
    <Provider store={store}>
        <Dashboard/>
    </Provider>
  );
}

export default App;
