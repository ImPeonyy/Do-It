"use client";

import { useState } from "react";
import {
    Button,
    Input,
    Label,
    Textarea,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    Badge,
} from "@/components/ui";
import { PlusIcon, Edit2Icon, Trash2Icon, BookOpenIcon, FolderIcon, SearchIcon, Volume2Icon } from "lucide-react";
import { cn } from "@/libs/utils";
import {
    Topic,
    useCreateTopic,
    useCreateVocabulary,
    useDeleteTopic,
    useDeleteVocabulary,
    useUpdateTopic,
    useUpdateVocabulary,
    Vocabulary,
    TopicForm,
    VocabularyForm,
} from "@/src/services";
import { ApiResponse, PART_OF_SPEECH_OPTIONS } from "@/src/constants";
import { ConfirmAlert, PageTitle } from "@/src/components/shared";
import { Controller, useForm } from "react-hook-form";
import { topicValidation, vocabularyValidation } from "@/libs/validations";
import { zodResolver } from "@hookform/resolvers/zod";

interface FlashCardManagementPageProps {
    initialTopics: ApiResponse<Topic[]>;
}

const FlashCardManagementPage = ({ initialTopics }: FlashCardManagementPageProps) => {
    const [topics, setTopics] = useState<Topic[]>(initialTopics.data || []);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [searchTopic, setSearchTopic] = useState("");
    const { mutate: createTopic } = useCreateTopic((data: Topic) => {
        setTopics([...topics, data]);
    });
    const { mutate: updateTopic } = useUpdateTopic((data: Topic) => {
        setTopics(topics.map((t) => (t.id === data.id ? data : t)));
    });

    const [vocabularies, setVocabularies] = useState<Record<number, Vocabulary[]>>({});
    const [searchVocab, setSearchVocab] = useState("");
    const { mutate: createVocab } = useCreateVocabulary((data: Vocabulary) => {
        if (!selectedTopic) return;
        setVocabularies({
            ...vocabularies,
            [selectedTopic.id]: [...(vocabularies[selectedTopic.id] || []), data],
        });
    });
    const { mutate: updateVocab } = useUpdateVocabulary((data: Vocabulary) => {
        if (!selectedTopic) return;
        setVocabularies({
            ...vocabularies,
            [selectedTopic.id]: vocabularies[selectedTopic.id].map((v) => (v.id === data.id ? data : v)),
        });
    });

    const [isTopicSheetOpen, setIsTopicSheetOpen] = useState(false);
    const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
    const topicForm = useForm<TopicForm>({
        defaultValues: {
            name: "",
            type: "vocabulary",
            description: "",
        },
        resolver: zodResolver(topicValidation),
    });

    const [isVocabSheetOpen, setIsVocabSheetOpen] = useState(false);
    const [editingVocab, setEditingVocab] = useState<Vocabulary | null>(null);
    const vocabForm = useForm<VocabularyForm>({
        defaultValues: {
            word: "",
            pronounce: "",
            partOfSpeech: "noun",
            meaning: "",
            exampleSentence: "",
        },
        resolver: zodResolver(vocabularyValidation),
    });

    const [deleteTopicId, setDeleteTopicId] = useState<number | null>(null);
    const [deleteVocabIds, setDeleteVocabIds] = useState<number[]>([]);

    const handleOpenTopicSheet = (topic?: Topic) => {
        if (topic) {
            setEditingTopic(topic);
            topicForm.reset(topic);
        } else {
            setEditingTopic(null);
            topicForm.reset({
                name: "",
                type: "",
                description: "",
            });
        }
        setIsTopicSheetOpen(true);
    };

    const handleSaveTopic = () => {
        if (editingTopic) {
            updateTopic({
                topicId: editingTopic.id,
                data: {
                    name: topicForm.getValues().name,
                    type: topicForm.getValues().type,
                    description: topicForm.getValues().description,
                },
            });
        } else {
            createTopic(topicForm.getValues());
        }
        setIsTopicSheetOpen(false);
    };

    const { mutate: deleteTopic } = useDeleteTopic((topicId: number) => {
        setTopics(topics.filter((t) => t.id !== topicId));
        const newVocabs = { ...vocabularies };
        delete newVocabs[topicId];
        setVocabularies(newVocabs);
        if (selectedTopic?.id === topicId) {
            setSelectedTopic(null);
        }
        setDeleteTopicId(null);
    });

    const handleDeleteTopic = (topicId: number) => {
        deleteTopic(topicId);
    };

    const handleOpenVocabSheet = (vocab?: Vocabulary) => {
        if (vocab) {
            setEditingVocab(vocab);
            vocabForm.reset({
                word: vocab.word,
                pronounce: vocab.pronounce,
                partOfSpeech: vocab.partOfSpeech,
                meaning: vocab.meaning || "",
                exampleSentence: vocab.exampleSentence || "",
            });
        } else {
            setEditingVocab(null);
            vocabForm.reset({
                word: "",
                pronounce: "",
                partOfSpeech: "noun",
                meaning: "",
                exampleSentence: "",
            });
        }
        setIsVocabSheetOpen(true);
    };

    const handleSaveVocab = () => {
        if (!selectedTopic) return;

        if (editingVocab) {
            updateVocab({
                vocabId: editingVocab.id,
                data: vocabForm.getValues(),
            });
        } else {
            createVocab({
                topicId: selectedTopic.id,
                ...vocabForm.getValues(),
            });
        }
        setIsVocabSheetOpen(false);
    };

    const { mutate: deleteVocab } = useDeleteVocabulary((vocabIds: number[]) => {
        if (!selectedTopic) return;
        const topicVocabs = vocabularies[selectedTopic.id] || [];
        setVocabularies({
            ...vocabularies,
            [selectedTopic.id]: topicVocabs.filter((v) => !vocabIds.includes(Number(v.id))),
        });
        setDeleteVocabIds([]);
    });

    const handleDeleteVocab = (vocabIds: number[]) => {
        deleteVocab(vocabIds);
    };

    const filteredTopics =
        topics.length > 0 ? topics.filter((topic) => topic.name.toLowerCase().includes(searchTopic.toLowerCase())) : [];
    const filteredVocabs =
        selectedTopic && selectedTopic.id in vocabularies
            ? vocabularies[selectedTopic.id].filter((vocab) =>
                  vocab.word.toLowerCase().includes(searchVocab.toLowerCase())
              )
            : [];

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8">
            <div className="mb-8">
                <PageTitle title="Flashcard Management" />
                <p className="text-muted-foreground">Create and manage your topics and flashcards</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <div className="bg-card rounded-lg border p-4 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-xl font-semibold">
                                <FolderIcon className="h-5 w-5" />
                                Topics
                            </h2>
                            <Button size="sm" onClick={() => handleOpenTopicSheet()}>
                                <PlusIcon className="h-4 w-4" />
                                Add Topic
                            </Button>
                        </div>

                        <div className="relative mb-4">
                            <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                            <Input
                                placeholder="Search topics..."
                                value={searchTopic}
                                onChange={(e) => setSearchTopic(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        <div className="max-h-[600px] space-y-2 overflow-y-auto">
                            {filteredTopics.map((topic) => (
                                <div
                                    key={topic.id}
                                    className={cn(
                                        "cursor-pointer rounded-lg border p-3 transition-all hover:shadow-md",
                                        selectedTopic?.id === topic.id
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/50"
                                    )}
                                    onClick={() => setSelectedTopic(topic)}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate font-medium">{topic.name}</h3>
                                            <p className="text-muted-foreground truncate text-sm">
                                                {topic.description}
                                            </p>
                                            <Badge variant="secondary" className="mt-1">
                                                {vocabularies[topic.id]?.length || 0} từ
                                            </Badge>
                                        </div>
                                        <div className="flex gap-1">
                                            <Button
                                                size="icon-sm"
                                                variant="ghost"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenTopicSheet(topic);
                                                }}
                                            >
                                                <Edit2Icon className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                size="icon-sm"
                                                variant="ghost"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDeleteTopicId(topic.id);
                                                }}
                                            >
                                                <Trash2Icon className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {selectedTopic ? (
                        <div className="bg-card rounded-lg border p-4 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h2 className="flex items-center gap-2 text-xl font-semibold">
                                        <BookOpenIcon className="h-5 w-5" />
                                        {selectedTopic.name}
                                    </h2>
                                    <p className="text-muted-foreground text-sm">{selectedTopic.description}</p>
                                </div>
                                <Button size="sm" onClick={() => handleOpenVocabSheet()}>
                                    <PlusIcon className="h-4 w-4" />
                                    Add Flashcard
                                </Button>
                            </div>

                            <div className="relative mb-4">
                                <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                <Input
                                    placeholder="Search flashcards..."
                                    value={searchVocab}
                                    onChange={(e) => setSearchVocab(e.target.value)}
                                    className="pl-9"
                                />
                            </div>

                            <div className="grid max-h-[600px] grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2">
                                {filteredVocabs.map((vocab) => (
                                    <div
                                        key={vocab.id}
                                        className="from-card to-muted/20 rounded-lg border bg-linear-to-br p-4 transition-all hover:shadow-lg"
                                    >
                                        <div className="mb-3 flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <h3 className="text-lg font-bold">{vocab.word}</h3>
                                                    <Button
                                                        size="icon-sm"
                                                        variant="ghost"
                                                        onClick={() => {
                                                            const utterance = new SpeechSynthesisUtterance(vocab.word);
                                                            utterance.lang = "en-US";
                                                            speechSynthesis.speak(utterance);
                                                        }}
                                                    >
                                                        <Volume2Icon className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <p className="text-muted-foreground text-sm">{vocab.pronounce}</p>
                                                <Badge variant="outline" className="mt-1">
                                                    {
                                                        PART_OF_SPEECH_OPTIONS.find(
                                                            (opt) => opt.value === vocab.partOfSpeech
                                                        )?.label
                                                    }
                                                </Badge>
                                            </div>
                                            <div className="flex gap-1">
                                                <Button
                                                    size="icon-sm"
                                                    variant="ghost"
                                                    onClick={() => handleOpenVocabSheet(vocab)}
                                                >
                                                    <Edit2Icon className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    size="icon-sm"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        setDeleteVocabIds([...deleteVocabIds, Number(vocab.id)])
                                                    }
                                                >
                                                    <Trash2Icon className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>

                                        {vocab.meaning && (
                                            <div className="mb-2">
                                                <p className="mb-1 text-sm font-medium">Nghĩa:</p>
                                                <p className="text-sm">{vocab.meaning}</p>
                                            </div>
                                        )}

                                        {vocab.exampleSentence && (
                                            <div className="border-t pt-2">
                                                <p className="mb-1 text-sm font-medium">Ví dụ:</p>
                                                <p className="text-muted-foreground text-sm italic">
                                                    {vocab.exampleSentence}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {filteredVocabs.length === 0 && (
                                <div className="py-12 text-center">
                                    <BookOpenIcon className="text-muted-foreground mx-auto mb-3 h-12 w-12" />
                                    <p className="text-muted-foreground">
                                        {`  No flashcards yet. Click "Add Flashcard" to create one!`}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-card rounded-lg border p-12 text-center shadow-sm">
                            <FolderIcon className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
                            <h3 className="mb-2 text-xl font-semibold">Select a topic to start</h3>
                            <p className="text-muted-foreground mb-4">
                                Select a topic from the list on the left or create a new topic
                            </p>
                            <Button onClick={() => handleOpenTopicSheet()}>
                                <PlusIcon className="h-4 w-4" />
                                Create New Topic
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <Sheet open={isTopicSheetOpen} onOpenChange={setIsTopicSheetOpen}>
                <SheetContent side="right" className="overflow-y-auto">
                    <form onSubmit={topicForm.handleSubmit(handleSaveTopic)} className="flex h-full flex-col">
                        <SheetHeader>
                            <SheetTitle>{editingTopic ? "Edit Topic" : "Create New Topic"}</SheetTitle>
                            <SheetDescription>Create and manage your topics and flashcards</SheetDescription>
                        </SheetHeader>

                        <div className="space-y-4 py-6">
                            <div>
                                <Label htmlFor="topic-name" required>
                                    Topic name
                                </Label>
                                <Controller
                                    control={topicForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <Input id="topic-name" placeholder="Example: Vocabulary TOEIC" {...field} />
                                    )}
                                />
                                {topicForm.formState.errors.name && (
                                    <p className="text-red-500">{topicForm.formState.errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="topic-type" required>
                                    Topic type
                                </Label>
                                <Controller
                                    control={topicForm.control}
                                    name="type"
                                    render={({ field }) => (
                                        <Input
                                            id="topic-type"
                                            placeholder="Example: Vocabulary"
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    )}
                                />
                                {topicForm.formState.errors.type && (
                                    <p className="text-red-500">{topicForm.formState.errors.type.message}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="topic-description" required>
                                    Description
                                </Label>
                                <Controller
                                    control={topicForm.control}
                                    name="description"
                                    render={({ field }) => (
                                        <Textarea placeholder="Description of this topic..." {...field} rows={4} />
                                    )}
                                />
                                {topicForm.formState.errors.description && (
                                    <p className="text-red-500">{topicForm.formState.errors.description.message}</p>
                                )}
                            </div>
                        </div>

                        <SheetFooter className="mt-auto">
                            <Button type="button" variant="outline" onClick={() => setIsTopicSheetOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">{editingTopic ? "Update" : "Create"}</Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>

            <Sheet open={isVocabSheetOpen} onOpenChange={setIsVocabSheetOpen}>
                <SheetContent side="right" className="overflow-y-auto">
                    <form onSubmit={vocabForm.handleSubmit(handleSaveVocab)} className="flex h-full flex-col">
                        <SheetHeader>
                            <SheetTitle>{editingVocab ? "Edit Flashcard" : "Create New Flashcard"}</SheetTitle>
                            <SheetDescription>Create and manage your flashcards</SheetDescription>
                        </SheetHeader>

                        <div className="space-y-4 py-6">
                            <div>
                                <Label htmlFor="vocab-word" required>
                                    Word
                                </Label>
                                <Controller
                                    control={vocabForm.control}
                                    name="word"
                                    render={({ field }) => (
                                        <Input id="vocab-word" placeholder="Example: Hello" {...field} />
                                    )}
                                />
                                {vocabForm.formState.errors.word && (
                                    <p className="text-red-500">{vocabForm.formState.errors.word.message}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="vocab-pronounce">Pronounce</Label>
                                <Controller
                                    control={vocabForm.control}
                                    name="pronounce"
                                    render={({ field }) => (
                                        <Input id="vocab-pronounce" placeholder="Example: /həˈloʊ/" {...field} />
                                    )}
                                />
                                {vocabForm.formState.errors.pronounce && (
                                    <p className="text-red-500">{vocabForm.formState.errors.pronounce.message}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="vocab-pos" required>
                                    Part of speech
                                </Label>
                                <Controller
                                    control={vocabForm.control}
                                    name="partOfSpeech"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {PART_OF_SPEECH_OPTIONS.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {vocabForm.formState.errors.partOfSpeech && (
                                    <p className="text-red-500">{vocabForm.formState.errors.partOfSpeech.message}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="vocab-meaning" required>
                                    Meaning
                                </Label>
                                <Controller
                                    control={vocabForm.control}
                                    name="meaning"
                                    render={({ field }) => (
                                        <Textarea placeholder="Example: Hello" {...field} rows={3} />
                                    )}
                                />
                                {vocabForm.formState.errors.meaning && (
                                    <p className="text-red-500">{vocabForm.formState.errors.meaning.message}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="vocab-example">Example Sentence</Label>
                                <Controller
                                    control={vocabForm.control}
                                    name="exampleSentence"
                                    render={({ field }) => (
                                        <Textarea placeholder="Example: Hello, how are you?" {...field} rows={3} />
                                    )}
                                />
                                {vocabForm.formState.errors.exampleSentence && (
                                    <p className="text-red-500">{vocabForm.formState.errors.exampleSentence.message}</p>
                                )}
                            </div>
                        </div>

                        <SheetFooter className="mt-auto">
                            <Button type="button" variant="outline" onClick={() => setIsVocabSheetOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">{editingVocab ? "Update" : "Create"}</Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>

            <ConfirmAlert
                open={deleteTopicId !== null}
                onOpenChange={(open) => !open && setDeleteTopicId(null)}
                title="Confirm Delete Topic"
                description="Are you sure you want to delete this topic? All flashcards in the topic will also be deleted. This action cannot be undone."
                onConfirm={() => deleteTopicId && handleDeleteTopic(deleteTopicId)}
                onCancel={() => setDeleteTopicId(null)}
            />

            <ConfirmAlert
                open={deleteVocabIds.length > 0}
                onOpenChange={(open) => !open && setDeleteVocabIds([])}
                title="Confirm Delete Flashcard"
                description="Are you sure you want to delete this flashcard? This action cannot be undone."
                onConfirm={() => deleteVocabIds.length > 0 && handleDeleteVocab(deleteVocabIds)}
                onCancel={() => setDeleteVocabIds([])}
            />
        </div>
    );
};

export default FlashCardManagementPage;
