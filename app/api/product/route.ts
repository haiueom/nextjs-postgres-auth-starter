import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
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
            price: Number(price),
            stock: Number(stock),
            image,
        }
    });

    return NextResponse.json({ product }, { status: 201 });
}

export async function PUT(req: Request) {
    const { id, name, description, price, stock, image } = await req.json();

    if (!id || !name || !description || !price || !stock || !image) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const product = await prisma.product.update({
        where: { id: id },
        data: {
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            image,
        }
    });

    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 201 });
}