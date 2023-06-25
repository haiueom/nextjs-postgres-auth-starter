import { Card, Title, Text } from '@tremor/react';
import ProductsTable from '@/components/tables/productTable';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Dashboard Admin',
    description:
        'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.',
};

export default async function IndexPage() {
    const items = await prisma.product.findMany({
        orderBy: {
            id: 'asc',
        },
    });

    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Title>Products</Title>
            <Text>A list of products retrieved from database.</Text>
            <Card className="mt-6">
                <ProductsTable items={items} />
            </Card>
        </main>
    );
}
