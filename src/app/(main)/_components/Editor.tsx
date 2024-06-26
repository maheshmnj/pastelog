// src/_components/PSContent.tsx
import dynamic from "next/dynamic";
import React, { ChangeEvent } from "react";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeHighlight";
import TextCompletionInput from "./completion";
import MDPreview from "./MDPreview";
// import ReactMarkdown from 'react-markdown';
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });
interface PSContentProps {
    className?: string;
    placeHolder?: string;
    value?: string;
    preview?: boolean;
    disabled?: boolean;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Editor: React.FC<PSContentProps> = ({ value, onChange, placeHolder, preview, disabled, className }) => {

    const placeholder: string =
        `Start typing here...
    \nPublish your logs to the cloud and access them from anywhere via a unique link.
    \nNo Sign up required.
    \n
    \nNote: Do not publish sensitive information here, these logs are public and can be accessed by anyone with the link.
    `;

    const customClass = `px-2 py-2 rounded-b-lg border-surface focus:ring-secondary focus:outline-none focus:ring-2 focus:ring-2 resize-y min-h-80 w-full reactMarkDown ${className}`;
    if (preview) {
        return <MDPreview
            className={customClass}
            value={value}
        />;
    }
    return (
        <TextCompletionInput
            customClass={`${customClass} line-break`}
            value={value || ''}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeHolder || placeholder}
            height="70vh"
            autoSuggest={false}
            maxHeight="100%"
        />
    );

};

export default Editor;
