import { MainLayout } from "@/components/layout";
import TestPage from "@/components/pages/test";
import { Leaderboard } from "@/src/components/shared";

const Page = () => {
    return (
        <MainLayout subContent={<Leaderboard />}>
            <TestPage/>

        </MainLayout>
    );
};

export default Page;
