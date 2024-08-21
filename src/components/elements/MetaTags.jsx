import Head from 'next/head'

const MetaTags = ({title}) => {
    return ( 
        <Head>
            {/* Basic metas */}
            <meta charSet="utf-8" />
            <meta name="robots" content="noindex, follow" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="description" content="Qwik Mart E-Commerce" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <title>{`${title?title:"Qwik Mart"} - E-Commerce`}</title>
        </Head>
     );
}
 
export default MetaTags;