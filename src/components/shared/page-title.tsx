import * as React from "react";

const PageTitle = ({ title }: { title: string }) => {
    return (
        <div className="flex w-full">
            <span className="text-5xl font-bold">{title}</span>
        </div>
    );
};

export default PageTitle;