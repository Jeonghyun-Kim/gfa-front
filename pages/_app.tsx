import React from 'react';
import Router from 'next/router';
import { SWRConfig } from 'swr';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { browserName, isAndroid } from 'react-device-detect';

import Layout from '../components/Layout';

import fetcher from '../lib/fetcher';
import { initGA } from '../lib/analytics';

import '../public/css/global.css';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default class MyApp extends App {
  componentDidMount(): void {
    if (process.env.NODE_ENV === 'production') {
      initGA();
    }

    if (/Web/.test(browserName)) {
      if (isAndroid)
        window.location.href = `intent://dev.ondisplay.co.kr${Router.asPath}#Intent;scheme=https;package=com.android.chrome;end`;
      else
        window.location.href = `https://urlopen.link/dev.ondisplay.co.kr${Router.asPath}`;
    }
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
          <meta name="theme-color" content="#000000" />
          <meta property="og:title" content="온라인 전시공간 onDisplay" />
          <meta
            property="og:description"
            content="관악미술협회 창립15주년 기념전"
          />
          <meta
            property="og:image"
            content="https://gfaa.ondisplay.co.kr/images/og-image.jpg"
          />
          <title>onDisplay</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500&display=swap"
            rel="stylesheet"
          />
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
