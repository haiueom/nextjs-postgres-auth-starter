'use client';

import { Card, Title, Grid, Col, Button } from '@tremor/react';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    createdAt: string;
    updatedAt: string;
}

interface FormData {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
}

interface Props {
    id: string;
}

export default function EditForm({ id }: Props) {
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState("");

    const router = useRouter();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/product/${id}`);
                if (res.ok) {
                    const data = await res.json()
                    setName(data.name);
                    setDescription(data.description);
                    setPrice(data.price);
                    setStock(data.stock);
                    setImage(data.image);
                    setProduct(data)
                } else {
                    throw new Error('Failed to fetch product');
                }
            } catch (error) {
                console.error(error);
                toast.error('Something went wrong');
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const body: FormData = {
                name,
                description,
                price: Number(price),
                stock: Number(stock),
                image
            };
            const res = await fetch(`/api/product/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (res.status === 201) {
                router.push('/admin/product');
            } else {
                throw new Error("Failed to update product");
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = useCallback(() => {
        setName(product?.name || "");
        setDescription(product?.description || "");
        setPrice(product?.price.toString() || "");
        setStock(product?.stock.toString() || "");
        setImage(product?.image || "");
    }, [product]);

    if (loading) {
        return (
            <Card className="mt-6 text-center">
                <Title>Loading...</Title>
            </Card>
        );
    }

    return (
        <Card className="mt-6">
            <form onSubmit={handleSubmit}>
                <Grid numItems={1} numItemsMd={2} className="gap-6">
                    <Col>
                        <label htmlFor="name" className="font-medium text-gray-600">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                            required
                            className="mt-2 w-full rounded-md border border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col>
                        <label htmlFor="description" className="font-medium text-gray-600">
                            Description
                        </label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Product Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={loading}
                            required
                            className="mt-2 w-full rounded-md border border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col>
                        <label htmlFor="price" className="font-medium text-gray-600">
                            Price
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="Product Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            disabled={loading}
                            required
                            className="mt-2 w-full rounded-md border border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col>
                        <label htmlFor="stock" className="font-medium text-gray-600">
                            Stock
                        </label>
                        <input
                            id="stock"
                            name="stock"
                            type="number"
                            placeholder="Product Stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            disabled={loading}
                            required
                            className="mt-2 w-full rounded-md border border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={image} className="mx-auto mt-2 w-full max-w-xs" alt="product" />
                    </Col>
                    <Col>
                        <label htmlFor="image" className="font-medium text-gray-600">
                            Image
                        </label>
                        <input
                            id="image"
                            name="image"
                            type="text"
                            placeholder="Product Image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            disabled={loading}
                            required
                            className="mt-2 w-full rounded-md border border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col numColSpan={1} numColSpanMd={2}>
                        <div className="flex gap-2 md:mt-4">
                            <Button type="submit" loading={loading}>Submit</Button>
                            <Button type="reset" onClick={resetForm} loading={loading}>Reset</Button>
                        </div>
                    </Col>
                </Grid>
            </form>
        </Card>
    );
}
