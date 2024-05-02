"use client";
import '../components/assets/styles/main.scss';
import { Inter } from 'next/font/google'
import { useState, useEffect } from "react";
import { Router } from "next/router"
import nProgress from "nprogress"
import { AuthProvider } from '@/components/providers/Auth';
import Layout from '@/components/pages/layout';
import SEO from '@/components/global/seo';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  authenticated: any
  children: React.ReactNode
}) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  nProgress.configure({ showSpinner: false })
  Router.events.on("routeChangeStart", (url) => nProgress.start())
  Router.events.on("routeChangeComplete", () => nProgress.done())
  Router.events.on("routeChangeError", () => nProgress.done())

  return (
    <AuthProvider authenticated={authenticated}>
      <SEO />
      <Layout setAuthenticated={setAuthenticated}>
        {children}
      </Layout>
    </AuthProvider>
  )
}

