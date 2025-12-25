import { MainLayout } from "@/components/layout";
import TestPage from "@/components/pages/test";
import { ApiResponse } from "@/src/constants";
import { apiServer } from "@/src/libs";
import { Test } from "@/src/services";

const Page = async () => {
    const tests = await apiServer<ApiResponse<Test[]>>("/toeic/tests", {
        method: "GET",
    });
    return (
        <MainLayout>
            <TestPage tests={tests} />
        </MainLayout>
    );
};

export default Page;
