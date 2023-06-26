'use client';

import {
    Card,
    Title,
    Text,
} from '@tremor/react';
import { useState } from 'react';
import LoadingDots from '@/components/loading-dots';

export default async function AddProductPage() {
    const [loading, setLoading] = useState(false);
    const anu = [
        "name",
        "description",
        "price",
        "stock",
        "image"
    ]

    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Card>
                <Title>Add new product</Title>
                <Text>Fill in the form below to add a new product.</Text>

                <form
                    className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        const formData = new FormData(e.target as HTMLFormElement);
                        const data = Object.fromEntries(formData.entries());
                        console.log(data);
                        setLoading(false);
                    }}
                >
                    <div className='col-span-6'>
                        <label htmlFor="name" className="block text-xs uppercase text-gray-600">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Product name"
                            required
                            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                        />
                    </div>
                    <div className='col-span-6'>
                        <label htmlFor="description" className="block text-xs uppercase text-gray-600">
                            Description
                        </label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Product Description"
                            required
                            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                        />
                    </div>
                    <div className='col-span-6'>
                        <label htmlFor="price" className="block text-xs uppercase text-gray-600">
                            Price
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="Product Price"
                            required
                            className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
                        />
                    </div>
                    <div className='col-span-6'>
                        <label htmlFor="stock" className="block text-xs uppercase text-gray-600">
                            Stock
                        </label>
                        <input
                            id="stock"
                            name="stock"
                            type="number"
                            placeholder="Product Stock"
                            required
                            className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
                        />
                    </div>
                    <div className='col-span-6'>
                        <label htmlFor="image" className="block text-xs uppercase text-gray-600">
                            Image
                        </label>
                        <input
                            id="image"
                            name="image"
                            type="string"
                            placeholder="Product Image"
                            required
                            className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
                        />
                    </div>
                    <button
                        disabled={loading}
                        className={`${
                            loading
                                ? 'cursor-not-allowed border-gray-200 bg-gray-100'
                                : 'border-black bg-black text-white hover:bg-white hover:text-black'
                        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
                    >
                        {loading ? (
                            <LoadingDots color="#808080" />
                        ) : (
                            <p>Submit</p>
                        )}
                    </button>
                </form>


            </Card>
        </main>
    );
};
