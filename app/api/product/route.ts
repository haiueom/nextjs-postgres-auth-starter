import prisma from 'libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
}
