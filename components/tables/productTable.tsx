"use client";

import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Title,
    Text,
    Button,
    Card
} from '@tremor/react';

import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon
} from '@heroicons/react/24/solid'

import { useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react'

interface Item {
    id: string;
    name: string;
    email: string;
    price: number;
    stock: number;
}

interface ItemsTableProps {
    items: Item[];
}

const ProductsTable: React.FC<ItemsTableProps> = ({ items }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Price</TableHeaderCell>
                        <TableHeaderCell>Stock</TableHeaderCell>
                        <TableHeaderCell>Action</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((i) => (
                        <TableRow key={i.id}>
                            <TableCell>{i.id}</TableCell>
                            <TableCell>
                                <Text>{i.name}</Text>
                            </TableCell>
                            <TableCell>
                                <Text>{i.price}</Text>
                            </TableCell>
                            <TableCell>
                                <Text>{i.stock}</Text>
                            </TableCell>
                            <TableCell className='flex gap-2'>
                                <Button
                                    icon={EyeIcon}
                                    size="xs"
                                    color='green'>View</Button>
                                <Button
                                    icon={PencilSquareIcon}
                                    size="xs"
                                    color='yellow'
                                    onClick={() => {
                                        setLoading(true);
                                        router.push(`/admin/product/edit/${i.id}`);
                                    }}
                                    loading={loading}
                                >Edit</Button>
                                <Button
                                    icon={TrashIcon}
                                    size="xs"
                                    color='red'
                                    onClick={openModal}
                                >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden transition-all">
                                    <Card>
                                        <Title>Delete this product?</Title>
                                        <Text className='mt-2'>This action cannot be undone.</Text>
                                        <div className="mt-4">
                                            <Button
                                                onClick={closeModal}
                                                className="mr-2"
                                                size="sm"
                                                color='red'
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                onClick={closeModal}
                                                size="sm"
                                                variant="secondary"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </Card>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ProductsTable;
