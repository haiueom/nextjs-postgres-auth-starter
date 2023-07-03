import BackBtn from '@/components/buttons/back.product';
import SingleTable from '@/components/tables/single.product';
import { Flex, Title, Text } from '@tremor/react';

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Product Detail</Title>
                    <Text>Product detail retrieved from database.</Text>
                </div>
                <div>
                    <BackBtn />
                </div>
            </Flex>
            <SingleTable id={params.id} />
        </main>
    );
}
