import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface Product {
    name: string,
    description: string,
    price: number,
    stock: number,
    image: string,
}

export async function GET(req: Request, context: { params: { id: string } }) {
    const id = context.params.id;
    const product = await prisma.product.findUnique({
        where: { id: id }
    });
    return NextResponse.json(product, { status: 200 });
}

export async function PUT(req: Request, context: { params: { id: string } }) {
    const id = context.params.id;

    const exist = await prisma.product.findUnique({
        where: { id: id }
    });

    if (!exist) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const { name, description, price, stock, image } = await req.json();

    const data: Product = {
        name,
        description,
        price,
        stock,
        image,
    }

    if (!name || !description || !price || !stock || !image) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const product = await prisma.product.update({
        where: { id: id },
        data: data
    });

    return NextResponse.json(product, { status: 201 });
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
    const id = context.params.id;

    const exist = await prisma.product.findUnique({
        where: { id: id }
    });

    if (!exist) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await prisma.product.delete({
        where: { id: id }
    });

    return NextResponse.json({ status: 'ok' }, { status: 200 });
}