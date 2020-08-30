import React from 'react';
import { SWRConfig } from 'swr';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
// import { initGA, logPageView } from '../lib/analytics';

import Layout from '../components/Layout';

import fetcher from '../lib/fetcher';

import '../public/css/global.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default class MyApp extends App {
  componentDidMount(): void {
    // initGA();
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {/* Import CSS for nprogress */}
          <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
          <link rel="stylesheet" type="text/css" href="/css/header.css" />
          <title>onDisplay</title>
        </Head>
        <SWRConfig
          value={{
            refreshInterval: 10000,
            fetcher,
            onError: (err) => {
              // eslint-disable-next-line no-console
              console.error(err);
            },
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    );
  }
}
