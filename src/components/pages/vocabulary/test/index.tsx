"use client";

import * as React from "react";
import { Carousel } from "@/src/components/ui";
import cn from "@/src/utils/cn.util";

const VocabularyTestPage = () => {
    const slides = [
        { id: 1, color: "bg-red-400", text: "Slide 1" },
        { id: 2, color: "bg-blue-400", text: "Slide 2" },
        { id: 3, color: "bg-green-400", text: "Slide 3" },
        { id: 1, color: "bg-red-400", text: "Slide 1" },
        { id: 2, color: "bg-blue-400", text: "Slide 2" },
        { id: 3, color: "bg-green-400", text: "Slide 3" },
        { id: 1, color: "bg-red-400", text: "Slide 1" },
        { id: 2, color: "bg-blue-400", text: "Slide 2" },
        { id: 3, color: "bg-green-400", text: "Slide 3" },
      ];
    
      return (
        <div className="w-[400px]">
          <Carousel
            items={slides}
            renderItem={(item) => (
              <div
                className={cn(
                  "flex h-56 items-center justify-center rounded-xl text-white text-xl",
                  item.color
                )}
              >
                {item.text}
              </div>
            )}
          />
        </div>
      );
};

export default VocabularyTestPage;