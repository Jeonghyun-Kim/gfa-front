import React from 'react';
import Router from 'next/router';
import { SWRConfig } from 'swr';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { browserName, isAndroid, isIOS } from 'react-device-detect';

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
        window.location.href = `intent://gfaa.ondisplay.co.kr/${Router.pathname}#Intent;scheme=https;package=com.android.chrome;end`;
      else
        window.location.href = `https://urlopen.link/gfaa.ondisplay.co.kr/${Router.pathname}`;
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
          <meta
            property="og:title"
            content="onDisplay - 관악미술협회 15주년 정기전"
          />
          <meta
            property="og:description"
            content="수준 높은 작가들의 온라인 전시를 감상해보세요."
          />
          <meta
            property="og:image"
            content="https://gfaa.ondisplay.co.kr/images/og-image.jpg"
          />
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
