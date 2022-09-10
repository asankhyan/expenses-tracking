import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/assets/styles/index.css';

export default function RootApp({Component, pageProps}){
    return <Component {...pageProps}/>;
}