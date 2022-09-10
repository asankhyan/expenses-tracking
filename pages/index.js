import { Provider } from "react-redux";
import Dashboard from "../src/components/dashboard/dashboard.component";
import store from "../src/redux/store";

function App() {
  return (
    <Provider store={store}>
        <Dashboard/>
    </Provider>
  );
}

export default App;
