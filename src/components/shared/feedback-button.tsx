"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useCreateFeedback } from "@/src/services";

export default function FeedbackButton() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);

    const { mutate: createFeedback } = useCreateFeedback(() => {
        setSent(true);
        setMessage("");
    });

    const handleSend = () => {
        if (!message.trim()) return;

        createFeedback({ message });
    };

    return (
        <>
            <Button
                size="icon"
                className="fixed right-6 bottom-6 z-50 h-14 w-14 rounded-full shadow-lg"
                onClick={() => setOpen(true)}
            >
                <MessageCircle className="h-6 w-6" />
            </Button>

            {open && (
                <Card className="fixed right-6 bottom-24 z-50 w-[340px] shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm">Feedback</CardTitle>
                        <Button size="icon" variant="ghost" onClick={() => setOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        {sent ? (
                            <p className="text-muted-foreground text-sm">✅ Thank you for your feedback!</p>
                        ) : (
                            <>
                                <Textarea
                                    placeholder="Enter your feedback..."
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />

                                <Button className="w-full" onClick={handleSend}>
                                    <Send className="mr-2 h-4 w-4" />
                                    Send
                                </Button>
                            </>
                        )}
                    </CardContent>
                </Card>
            )}
        </>
    );
}
