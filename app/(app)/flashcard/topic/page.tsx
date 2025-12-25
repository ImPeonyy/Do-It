import TopicPage from "@/components/pages/flashcard/topic";
import { EFlashCardMode } from "@/components/pages/flashcard";

interface SearchParams {
    mode?: EFlashCardMode;
    page?: number;
    limit?: number;
}

const Page = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
    const { mode, page, limit } = await searchParams;

    return <TopicPage mode={mode} page={page} limit={limit} />;
};

export default Page;
