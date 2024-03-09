'use client';

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Toaster } from "../ui/toaster";

export default function Layout({ 
  children 
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen justify-between my-8">
      <Header />
      <main className='items-center container mx-auto my-8 lg:my-16 flex-1 px-10 overflow-x-hidden'>
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};
