import { Html, Head, Main, NextScript } from 'next/document';

export default function DefaultPage(){
    return(
        <Html>
            <Head>
               <title>Expenses Tracking</title> 
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
}