// src/_components/Editor.tsx
'use client';
import React, { useEffect, useRef } from 'react';

interface PastelogEditorProps {
    className?: string;
    placeHolder?: string;
    value?: string;
    onChange?: (value: string) => void;
    id?: string;
}

const PastelogEditor: React.FC<PastelogEditorProps> = ({ value, onChange, placeHolder, className, id }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const isComposingRef = useRef(false);

    // Initialize editor content
    useEffect(() => {
        if (editorRef.current && value !== undefined) {
            const currentText = editorRef.current.textContent || '';
            if (currentText !== value) {
                editorRef.current.textContent = value;
            }
        }
    }, [value]);

    // Handle input changes
    const handleInput = () => {
        if (!isComposingRef.current && editorRef.current && onChange) {
            const newValue = editorRef.current.textContent || '';
            onChange(newValue);
        }
    };

    // Handle composition events (for IME input like Chinese, Japanese, etc.)
    const handleCompositionStart = () => {
        isComposingRef.current = true;
    };

    const handleCompositionEnd = () => {
        isComposingRef.current = false;
        handleInput();
    };

    // Focus on mount
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    }, []);

    return (
        <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            className={`
                md:w-3/4 lg:w-2/3 w-full
                mx-auto
                outline-none 
                focus:outline-none 
                p-6
                overflow-auto
                ${className || ''}
            `}
            data-placeholder={placeHolder || 'Start typing here...'}
            suppressContentEditableWarning
            style={{
                minHeight: '100vh',
                height: 'auto',
                border: 'none',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                lineHeight: '1.6',
            }}
        />
    );
};

export default PastelogEditor;
