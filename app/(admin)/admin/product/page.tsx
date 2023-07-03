import { Title, Text, Flex } from '@tremor/react';
import AllTable from '@/components/tables/all.product';
import AddBtn from '@/components/buttons/add.product';

export default async function Page() {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Admin Products</Title>
                    <Text>A list of products retrieved from database.</Text>
                </div>
                <div>
                    <AddBtn />
                </div>
            </Flex>
            <AllTable />
        </main>
    );
}
