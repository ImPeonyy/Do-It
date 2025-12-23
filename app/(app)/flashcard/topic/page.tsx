import TopicPage from "@/components/pages/flashcard/topic";

type TopicType = "learn" | "test";

interface PageProps {
    searchParams?: {
        type?: TopicType;
        page?: string;
        limit?: string;
    };
}

const Page = ({ searchParams }: PageProps) => {
    const type: TopicType = (searchParams?.type as TopicType) ?? "learn";
    const page = searchParams?.page ? Number(searchParams.page) : 1;
    const limit = searchParams?.limit ? Number(searchParams.limit) : 6;

    return <TopicPage type={type} page={page} limit={limit} />;
};

export default Page;