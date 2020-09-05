import React from 'react';
import { SWRConfig } from 'swr';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import Layout from '../components/Layout';

import fetcher from '../lib/fetcher';

import '../public/css/global.css';

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
          <meta name="theme-color" content="#000000" />
          <meta
            property="og:title"
            content="onDisplay - 관악미술협회 15주년 정기전"
          />
          <meta
            property="og:description"
            content="코로나 19로 인해 문화생활이 힘든 지금, 수준 높은 작가들의 온라인 전시를 감상해보세요."
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
