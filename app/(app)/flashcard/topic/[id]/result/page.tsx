import TopicResultPage from "@/src/components/pages/flashcard/topic/topic-result";

interface Params {
    id: string;
}

const Page = async ({ params }: { params: Promise<Params> }) => {
    const { id } = await params;
    return <TopicResultPage topicId={id} />;
};

export default Page;
