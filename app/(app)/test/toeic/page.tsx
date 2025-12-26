import ToeicPage from "@/components/pages/test/toeic";
import { MainLayout } from "@/components/layout";
import { Leaderboard } from "@/src/components/shared";

interface SearchParams {
    page?: number;
    limit?: number;
}

const Page = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
    const { page, limit } = await searchParams;

    return (
        <MainLayout subContent={<Leaderboard />}>
            <ToeicPage page={page} limit={limit} />
        </MainLayout>
    );
};

export default Page;
