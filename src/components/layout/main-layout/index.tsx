import * as React from "react";

const MainLayout = ({ children, subContent }: { children: React.ReactNode; subContent?: React.ReactNode }) => {
    return (
        <div className="container grid grid-cols-12 gap-4">
            <div className="col-span-9">{children}</div>
            <div className="col-span-3">{subContent}</div>
        </div>
    );
};

export default MainLayout;
