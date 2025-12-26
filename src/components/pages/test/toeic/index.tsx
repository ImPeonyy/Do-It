"use client";

import { AiLoading, PageTitle, ToeicTestCard } from "@/components/shared";
import MainPagination from "@/src/components/shared/paginations/main-pagination";
import { Test, useGetTests } from "@/src/services";
import { usePathname, useRouter } from "next/navigation";


interface ToeicPageProps {
    page?: number;
    limit?: number;
}

const ToeicPage = ({ page, limit }: ToeicPageProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const { data: testsPagination, isLoading } = useGetTests(page ?? 1, limit ?? 6);

    const handlePageChange = (page: number) => {
        router.push(`${pathname}?page=${page}&limit=${limit}`);
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <AiLoading />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            <PageTitle title="Toeic Test" />
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4">
                    {testsPagination?.data.map((test: Test) => (
                        <ToeicTestCard
                            key={test.id}
                            title={test.title}
                            description={test.description}
                            path={`/${test.id}`}
                            partsProcess={test.partsProcess}
                            createdAt={test.createdAt}
                        />
                    ))}
                </div>
                <MainPagination
                    currentPage={testsPagination?.pagination?.page ?? 1}
                    totalPages={testsPagination?.pagination?.totalPages ?? 1}
                    getHref={(page) => `${pathname}?page=${page}&limit=${limit}`}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default ToeicPage;
