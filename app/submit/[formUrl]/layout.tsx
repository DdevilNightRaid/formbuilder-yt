import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen min-w-full h-screen bg-background'>
      <nav className='flex justify-between border-b border-border h-[60px] px-4 py-2'>
        <Logo />
        <ThemeSwitcher />
      </nav>
      <main className='flex w-full flex-grow'>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout