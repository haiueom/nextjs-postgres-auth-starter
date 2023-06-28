import { Card, Title, Text, Flex } from '@tremor/react';
import ProductsTable from '@/components/tables/productTable';
import prisma from '@/lib/prisma';
import { Metadata } from 'next'
import Btn from '@/components/buttons/addProduct';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Dashboard Admin',
    description:
        'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.',
};

export default async function IndexPage() {
    const items = await prisma.product.findMany({});

    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Admin Products</Title>
                    <Text>A list of products retrieved from database.</Text>
                </div>
                <div>
                    <Btn text='Add Product' />
                </div>
            </Flex>
            <Card className="mt-6">
                <ProductsTable items={items} />
            </Card>
        </main>
    );
}
