import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/Modal/RegisterModal'
import LoginModal from './components/Modal/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import ToasterProvider from './providers/ToasterProvider'
import RentModal from './components/Modal/RentModal'
import SearchModal from './components/Modal/SearchModal'

export const metadata = {
  title: 'Achyut',
  description: 'Achyut',
}

const font = Nunito({
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <SearchModal />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
