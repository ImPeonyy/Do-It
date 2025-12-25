import { MainLayout } from "@/components/layout";
import TestPage from "@/components/pages/test";
import { ServerTestsService } from "@/src/services/server-side";

const Page = async () => {
    const tests = await ServerTestsService.getTests();
    
    return (
        <MainLayout>
            <TestPage testsPagination={tests} />
        </MainLayout>
    );
};

export default Page;
