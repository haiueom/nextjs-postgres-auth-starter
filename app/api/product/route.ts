import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(products, { status: 200 });
}

export async function POST(req: Request) {
    const { name, description, price, stock, image } = await req.json();

    if (!name || !description || !price || !image) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const product = await prisma.product.create({
        data: {
            name,
            description,
            price,
            stock,
            image,
        }
    });

    return NextResponse.json(product, { status: 201 });
}