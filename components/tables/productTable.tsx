import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
    Button
} from '@tremor/react';

import { 
    PencilSquareIcon,
    TrashIcon,
    EyeIcon
} from '@heroicons/react/24/solid'

interface Item {
    id: number;
    name: string;
    email: string;
    price: number;
    stock: number;
}

interface ItemsTableProps {
    items: Item[];
}

const ProductsTable: React.FC<ItemsTableProps> = ({ items }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>price</TableHeaderCell>
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
                        <TableCell>
                            <Button icon={EyeIcon} size="xs">View</Button>
                            <Button icon={PencilSquareIcon} size="xs" color='yellow'>Edit</Button>
                            <Button icon={TrashIcon} size="xs" color='red'>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ProductsTable;
