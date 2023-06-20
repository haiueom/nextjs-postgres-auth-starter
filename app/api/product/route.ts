import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (id) {
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
        });
        
        return res.json(product);
    }
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });
    
    return res.json(products);
    }

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const product = await prisma.product.create({
        data: {
            name: req.body.name ?? "Product name",
            description: req.body.description ?? "Product description",
            price: req.body.price ?? 0,
            stock: req.body.stock ?? 0,
            image: req.body.image ?? "https://placehold.co/200x100.png?text=Product+image",
        },
    });
    
    return res.json(product);
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
    const { id }= req.query
    const product = await prisma.product.update({
        where: { id: Number(id) },
        data: req.body,
    });
    
    return res.json(product);
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    await prisma.product.delete({
        where: { id: Number(id) },
    });
    
    return res.send({ status: "ok" });
}