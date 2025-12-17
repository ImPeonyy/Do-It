import TestDetailPage from "@/components/pages/test/toeic/test-detail";

const Page = async ({ params }: { params: Promise<{ testId: string }> }) => {
    const { testId } = await params;
    return <TestDetailPage testId={testId} />;
};

export default Page;
