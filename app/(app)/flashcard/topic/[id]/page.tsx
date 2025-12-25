import TopicDetailPage from "@/components/pages/flashcard/topic/topic-detail";
import { EFlashCardMode } from "@/components/pages/flashcard";

interface Params {
    id: string;
}

interface SearchParams {
    mode: EFlashCardMode;
}

const Page = async ({ params, searchParams }: { params: Promise<Params>; searchParams: Promise<SearchParams> }) => {
    const { id } = await params;
    const { mode } = await searchParams;
    return <TopicDetailPage topicId={id} mode={mode} />;
};

export default Page;
