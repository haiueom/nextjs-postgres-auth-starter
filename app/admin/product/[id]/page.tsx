import prisma from '@/lib/prisma'
import { Card, Title, Text } from '@tremor/react';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const product = await prisma.product.findUnique({
        where: {
            id: Number(id),
        },
    })

    if (!product) {
        return (
            <main className="mx-auto max-w-7xl p-4 md:p-10 flex flex-col justify-center items-center text-center">
                <Card>
                    <Title>Product not found</Title>
                    <Text>Sorry, but the product you were looking for could not be found.</Text>
                </Card>
            </main>
        )
    }

    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10 flex flex-col justify-center items-center text-center">
            <Card>
                <Title>Product {id}</Title>
                <Text>{product}</Text>
            </Card>
        </main>
    )
}