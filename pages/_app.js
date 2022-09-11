import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import '../public/assets/styles/index.css';
import Progress from '../src/components/progress/progress.component';
import store from '../src/redux/store';

export default function RootApp({Component, pageProps}){
    return (
        <>
            <Head>
               <title>Expenses Tracking</title>
            </Head>
            <Provider store={store}>
                <Progress/>
                <Component {...pageProps}/>;
            </Provider>
        </>
    );
}