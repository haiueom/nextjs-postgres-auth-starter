import BackBtn from '@/components/buttons/back.product';
import EditForm from '@/components/forms/edit.product';
import { Title, Text, Flex } from '@tremor/react';

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Add Product</Title>
                    <Text>Fill in the form below to add a new product.</Text>
                </div>
                <div>
                    <BackBtn />
                </div>
            </Flex>
            <EditForm id={params.id} />
        </main>
    )
};