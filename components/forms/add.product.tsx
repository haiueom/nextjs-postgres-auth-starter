"use client";

import { Card, Grid, Col, Button } from '@tremor/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('https://via.placeholder.com/300x300');

    const handleForm = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const target = e.target as typeof e.target & {
            name: { value: string };
            description: { value: string };
            price: { value: number };
            stock: { value: number };
            image: { value: string };
        };
        const body = {
            name: target.name.value,
            description: target.description.value,
            price: Number(target.price.value),
            stock: Number(target.stock.value),
            image: target.image.value,
        };
        const res = await fetch('/api/product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (res.status === 201) {
            toast.success('Product added successfully');
            router.refresh();
            router.push('/admin/product');
        } else {
            toast.error('Something went wrong');
        }
        setLoading(false);
    };

    return (
        <Card className='mt-6'>
            <form onSubmit={handleForm}>
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
                            disabled={loading}
                            required
                            className="mt-2 w-full rounded-md border border-gray-400 px-3 py-2 placeholder-tre disabled:bg-tremor-background-muted"
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
                            disabled={loading}
                            onChange={(e) => e.target.value == "" ? setImage('https://via.placeholder.com/300x300') : setImage(e.target.value)}
                            required
                            className="mt-2 w-full rounded-md border border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col numColSpan={1} numColSpanMd={2}>
                        <div className='flex gap-2 md:mt-4'>
                            <Button type='submit' loading={loading}>Submit</Button>
                            <Button type='reset' disabled={loading} onClick={() => setImage('https://via.placeholder.com/300x300')}>Reset</Button>
                        </div>
                    </Col>
                </Grid>
            </form>
        </Card>
    )
}