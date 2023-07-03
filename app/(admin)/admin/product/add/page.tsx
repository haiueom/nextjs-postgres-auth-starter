import AddForm from "@/components/forms/add.product";
import BackBtn from "@/components/buttons/back.product";
import { Flex, Title, Text } from "@tremor/react";

export default async function AddProductPage() {
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
            <AddForm />
        </main>
    )
};
