import FlashCardManagementPage from "@/src/components/pages/flashcard/management";
import { ServerTopicsService } from "@/src/services/server-side";

const Page = async () => {
    const topics = await ServerTopicsService.getUserTopics();
    return <FlashCardManagementPage initialTopics={topics} />;
};

export default Page;