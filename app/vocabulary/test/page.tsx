import VocabularyTestPage from "@/src/components/pages/vocabulary/test";
import { MainLayout } from "@/components/layout";
import { SideBar } from "@/components/shared";

const Page = () => {
    return (
        <MainLayout subContent={<SideBar />}>
            <VocabularyTestPage />
        </MainLayout>
    );
};

export default Page;
