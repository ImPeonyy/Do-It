import TopicDetailPage from "@/components/pages/flashcard/topic/topic-detail";
import { EFlashCardMode } from "@/src/components/pages/flashcard";

interface Params {
    id: string;
}

interface SearchParams {
    type: EFlashCardMode;
}

const Page = async ({ params, searchParams }: { params: Promise<Params>, searchParams: Promise<SearchParams> }) => {
    const { id } = await params;
    const { type } = await searchParams;
    return <TopicDetailPage topicId={id} type={type} />;
};

export default Page;