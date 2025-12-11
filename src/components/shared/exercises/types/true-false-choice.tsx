import {TrueFalseSelection} from "@/components/ui";

export interface TrueFalseChoiceProps {
    id: string;
    question: string;
    value?: string;
    onChange?: (val: string) => void;
}

const TrueFalseChoice = ({ id, question, value, onChange }: TrueFalseChoiceProps) => {
    return (
        <div className="flex justify-between items-center gap-2">
            <span className="text-xl font-medium">{question}</span>
            <TrueFalseSelection id={id} value={value} onChange={onChange} className="shrink-0" />
        </div>
    );
};

export default TrueFalseChoice;