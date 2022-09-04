import { Box } from '@chakra-ui/react';
import Head from 'next/head';
export const siteTitle = 'Anagrammy';

export default function Layout({ children }: { children: React.ReactNode; home?: boolean }) {
  return (
    <Box backgroundColor="primaryBgColor" height="calc(100vh)">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Anagram word play" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {children}
    </Box>
  );
}
