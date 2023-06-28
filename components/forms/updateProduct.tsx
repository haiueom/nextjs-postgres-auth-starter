"use client";

import { Card, Title, Text, Grid, Col, Flex, Button } from '@tremor/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

interface Item {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
}

interface ItemsTableProps {
    item: Item;
}

const UpdateProductForm: React.FC<ItemsTableProps> = (item) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const i = item.item;

    const [name, setName] = useState(i.name);
    const [description, setDescription] = useState(i.description);
    const [price, setPrice] = useState(i.price);
    const [stock, setStock] = useState(i.stock);
    const [image, setImage] = useState(i.image);

    const resetForm = () => {
        setName(i.name);
        setDescription(i.description);
        setPrice(i.price);
        setStock(i.stock);
        setImage(i.image);
    };

    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Update Product</Title>
                    <Text>Fill in the form below to update the product.</Text>
                </div>
                <div>
                    <Button
                    loading={loading}
                    onClick={() => {
                        setLoading(true);
                        router.push("/admin/product");
                    }}>Back</Button>
                </div>
            </Flex>
            <Card className='mt-6'>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        const target = e.target as typeof e.target & {
                            name: { value: string };
                            description: { value: string };
                            price: { value: string };
                            stock: { value: string };
                            image: { value: string };
                        };
                        const body = {
                            id: i.id,
                            name: target.name.value,
                            description: target.description.value,
                            price: target.price.value,
                            stock: target.stock.value,
                            image: target.image.value,
                        };
                        const res = await fetch('/api/product', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(body),
                        });
                        if (res.status === 201) {
                            router.push('/admin/product');
                        } else {
                            toast.error('Something went wrong');
                        }
                        setLoading(false);
                    }}
                >
                    <Grid numItems={1} numItemsMd={2} className="gap-6">
                        <Col>
                            <label htmlFor="name" className="text-gray-600 font-medium">
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
                            <label htmlFor="description" className="text-gray-600 font-medium">
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
                            <label htmlFor="price" className="text-gray-600 font-medium">
                                Price
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="Product Price"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                disabled={loading}
                                required
                                className="mt-2 w-full rounded-md border border-gray-400 px-3 py-2 placeholder-gray-400"
                            />
                        </Col>
                        <Col>
                            <label htmlFor="stock" className="text-gray-600 font-medium">
                                Stock
                            </label>
                            <input
                                id="stock"
                                name="stock"
                                type="number"
                                placeholder="Product Stock"
                                value={stock}
                                onChange={(e) => setStock(Number(e.target.value))}
                                disabled={loading}
                                required
                                className="mt-2 w-full rounded-md border border-gray-400 px-3 py-2 placeholder-gray-400"
                            />
                        </Col>
                        <Col>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={image} className="mt-2 mx-auto max-w-xs w-full" alt="product"/>
                        </Col>
                        <Col>
                            <label htmlFor="image" className="text-gray-600 font-medium">
                                Image
                            </label>
                            <input
                                id="image"
                                name="image"
                                type="string"
                                placeholder="Product Image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                disabled={loading}
                                required
                                className="mt-2 w-full rounded-md border border-gray-400 px-3 py-2 placeholder-gray-400"
                            />
                        </Col>
                        <Col numColSpan={1} numColSpanMd={2}>
                            <div className='flex gap-2 md:mt-4'>
                                <Button type='submit' loading={loading}>Submit</Button>
                                <Button type='reset' onClick={resetForm} loading={loading}>Reset</Button>
                            </div>
                        </Col>
                    </Grid>
                </form>
            </Card>
        </main>
    )
}

export default UpdateProductForm;