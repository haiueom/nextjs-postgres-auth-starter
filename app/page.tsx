import { Card, Title, Text } from '@tremor/react';
import Search from '@/components/searchs/search';
import UsersTable from '@/components/tables/table';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';

  // prisma find many with parameter search
  const users = await prisma.user.findMany({
    orderBy: {
      email: 'asc'
    },

  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>
        A list of users retrieved from a MySQL database (PlanetScale).
      </Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
