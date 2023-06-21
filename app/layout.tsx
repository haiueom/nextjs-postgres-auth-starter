import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/components/navbars/navbar';
import Toast from '@/components/toasts/toast';
import { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';

export const metadata = {
  title: 'Next.js 13 + PlanetScale + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Navbar user={session?.user} />
        </Suspense>
        {children}
        <Analytics />
        <Toast />
      </body>
    </html>
  );
}
