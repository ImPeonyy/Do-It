import PracticePage from "@/components/pages/test/toeic/test-detail/practice";

const Page = async ({params, searchParams }: { params: Promise<{ testId: string }>, searchParams: Promise<{ part: string[] }> }) => {
    const { testId } = await params;
    const { part } = await searchParams;
    
    return <PracticePage testId={testId} part={part} />;
};

export default Page;
