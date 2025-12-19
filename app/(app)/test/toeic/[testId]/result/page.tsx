import ResultPage from "@/components/pages/test/toeic/result";

const Page = async ({ params }: { params: Promise<{ testId: string }> }) => {
    const { testId } = await params;
    return <ResultPage testId={testId} />;
};

export default Page;