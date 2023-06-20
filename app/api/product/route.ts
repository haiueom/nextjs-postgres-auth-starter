import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { id } = await req.json();
    if (id) {
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
        });
        
        return NextResponse.json(product);
    }
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(products);
}
