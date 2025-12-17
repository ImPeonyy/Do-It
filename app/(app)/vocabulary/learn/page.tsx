import { MainLayout } from "@/components/layout";
import VocabularyLearnPage from "@/components/pages/vocabulary/learn";
import { SideBar } from "@/components/shared";

const Page = () => {
    return (
        <MainLayout subContent={<SideBar />}>
            <VocabularyLearnPage />
        </MainLayout>
    );
};

export default Page;
