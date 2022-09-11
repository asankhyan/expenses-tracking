import { Html, Head, Main, NextScript } from 'next/document';

export default function DefaultPage(){
    return(
        <Html>
            <Head>
               <meta charSet="utf-8"/><link rel="icon" href="/assets/images/favicon.ico"/>
               <meta name="theme-color" content="#000000"/>
               <meta name="description" content="An App to track your daily expenses, so can help you easily manage your spendings."/>
               <link rel="apple-touch-icon" href="/assets/images/logo192.png"/>
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
}