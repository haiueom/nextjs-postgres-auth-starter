import { Card, Title, Text } from '@tremor/react';
import Search from '@/components/searchs/search';
import UsersTable from '@/components/tables/userTable';
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';
import Navbar from '@/components/navbars/navbar';
import { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';

export const metadata = {
    title: 'Next.js 13 + PlanetScale + NextAuth + Tailwind CSS',
    description:
        'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.',
};

export default async function IndexPage() {
    const users = await prisma.user.findMany({
        orderBy: {
            id: 'asc',
        },
    });

    const session = await getServerSession();

    return (
        <>
        <Suspense>
            <Navbar user={session?.user} />
        </Suspense>
        <main className="mx-auto max-w-7xl p-4 md:p-10">
                <Title>Users</Title>
                <Text>A list of users retrieved from a MySQL database (PlanetScale).</Text>
                <Search />
                <Card className="mt-6">
                    <UsersTable users={users} />
                </Card>
        </main>
        </>
    );
}
