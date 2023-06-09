import './globals.css'
import { ReactNode } from 'react'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import { Hero } from '@/components/layout/Hero'
import { Profile } from '@/components/layout/Profile'
import { SignIn } from '@/components/layout/SignIn'
import { Copyright } from '@/components/layout/Copyright'
import { cookies } from 'next/headers'
import { SearchButton } from '@/components/layout/SearchButton'
import ThemeProvider from '@/contexts/MemoriesData'
import ModalProvider from '@/contexts/Modal'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'A spacetime built with React, Next.js, TailwindCSS, and TypeScript.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans  text-gray-100`}
      >
        <main className="grid min-h-screen w-full md:grid-cols-2">
          {/* Left  */}
          <div className="relative flex flex-col items-start justify-between space-y-2 overflow-hidden border-r border-white/10    bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16 ">
            {/* Blur  */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2  rounded-full bg-purple-700 opacity-50 blur-full"></div>
            {/* Stripes  */}
            <div className="absolute bottom-0 right-2  top-0 w-2 bg-stripes  max-md:hidden"></div>

            {/* Sign in  */}

            {isAuthenticated ? (
              <div className=" flex w-full flex-row justify-between">
                <Profile />
                <ModalProvider>
                  <SearchButton />
                </ModalProvider>
              </div>
            ) : (
              <SignIn />
            )}

            {/* Hero  */}
            <Hero />

            {/* Copyright  */}
            <Copyright />
          </div>

          {/* Right  */}
          <div className=" flex max-h-screen flex-col  bg-[url(../assets/bg-stars.svg)] bg-cover md:overflow-y-scroll ">
            <ThemeProvider> {children}</ThemeProvider>
          </div>
        </main>
      </body>
    </html>
  )
}
