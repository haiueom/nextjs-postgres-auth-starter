import { Title, Metric } from '@tremor/react';

export default async function IndexPage() {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10 flex flex-col h-full text-center justify-center items-center gap-4">
            <Metric>This is Home Page</Metric>
            <Title>Halooooo.</Title>
        </main>
    );
}