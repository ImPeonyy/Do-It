import * as React from "react";

const MainLayout = ({ children, subContent }: { children: React.ReactNode; subContent?: React.ReactNode }) => {
    return (
        <div className="container grid grid-cols-12 gap-4 px-40 py-10">
            <div className="col-span-8">{children}</div>
        
            <div className="col-span-4">{subContent}</div>
        </div>
    );
};

export default MainLayout;
