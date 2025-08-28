"use client";
import React, { useState, useRef, useCallback } from "react";
import { Button } from "../Button";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListIcon,
  LinkIcon,
  ImageIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  CodeIcon,
  QuoteIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  EyeIcon,
  EditIcon,
  UndoIcon,
  RedoIcon,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
  maxHeight?: string;
  disabled?: boolean;
  showPreview?: boolean;
  onImageUpload?: (file: File) => Promise<string>;
}

type FormatType =
  | "bold"
  | "italic"
  | "underline"
  | "insertOrderedList"
  | "insertUnorderedList"
  | "justifyLeft"
  | "justifyCenter"
  | "justifyRight"
  | "formatBlock"
  | "insertHTML"
  | "createLink"
  | "unlink";

interface ToolbarButton {
  command:
    | FormatType
    | "heading1"
    | "heading2"
    | "heading3"
    | "quote"
    | "code"
    | "image"
    | "link";
  icon: React.ElementType;
  title: string;
  value?: string;
}

const toolbarButtons: ToolbarButton[] = [
  { command: "bold", icon: BoldIcon, title: "Bold" },
  { command: "italic", icon: ItalicIcon, title: "Italic" },
  { command: "underline", icon: UnderlineIcon, title: "Underline" },
  { command: "heading1", icon: Heading1Icon, title: "Heading 1" },
  { command: "heading2", icon: Heading2Icon, title: "Heading 2" },
  { command: "heading3", icon: Heading3Icon, title: "Heading 3" },
  { command: "insertUnorderedList", icon: ListIcon, title: "Bullet List" },
  { command: "insertOrderedList", icon: ListIcon, title: "Numbered List" },
  { command: "justifyLeft", icon: AlignLeftIcon, title: "Align Left" },
  { command: "justifyCenter", icon: AlignCenterIcon, title: "Align Center" },
  { command: "justifyRight", icon: AlignRightIcon, title: "Align Right" },
  { command: "quote", icon: QuoteIcon, title: "Quote" },
  { command: "code", icon: CodeIcon, title: "Code Block" },
  { command: "link", icon: LinkIcon, title: "Insert Link" },
  { command: "image", icon: ImageIcon, title: "Insert Image" },
];

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing your content...",
  className = "",
  minHeight = "300px",
  maxHeight = "600px",
  disabled = false,
  showPreview = true,
  onImageUpload,
}: RichTextEditorProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const executeCommand = useCallback(
    (command: FormatType, value?: string) => {
      if (!editorRef.current || disabled) return;

      document.execCommand(command, false, value);
      editorRef.current.focus();

      // Update content after command execution
      setTimeout(() => {
        if (editorRef.current) {
          onChange(editorRef.current.innerHTML);
        }
      }, 0);
    },
    [onChange, disabled]
  );

  const handleToolbarClick = useCallback(
    (button: ToolbarButton) => {
      if (disabled) return;

      switch (button.command) {
        case "heading1":
          executeCommand("formatBlock", "<h1>");
          break;
        case "heading2":
          executeCommand("formatBlock", "<h2>");
          break;
        case "heading3":
          executeCommand("formatBlock", "<h3>");
          break;
        case "quote":
          executeCommand("formatBlock", "<blockquote>");
          break;
        case "code":
          executeCommand("formatBlock", "<pre>");
          break;
        case "link":
          handleLinkClick();
          break;
        case "image":
          handleImageClick();
          break;
        default:
          executeCommand(button.command as FormatType, button.value);
      }
    },
    [executeCommand, disabled]
  );

  const handleLinkClick = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setLinkText(selection.toString());
    }
    setIsLinkModalOpen(true);
  };

  const insertLink = () => {
    if (linkUrl) {
      if (linkText) {
        executeCommand(
          "insertHTML",
          `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
        );
      } else {
        executeCommand("createLink", linkUrl);
      }
    }
    setIsLinkModalOpen(false);
    setLinkUrl("");
    setLinkText("");
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !onImageUpload) return;

    try {
      const imageUrl = await onImageUpload(file);
      executeCommand(
        "insertHTML",
        `<img src="${imageUrl}" alt="${file.name}" style="max-width: 100%; height: auto;" />`
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    // Reset file input
    event.target.value = "";
  };

  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      executeCommand("insertHTML", text);
    },
    [executeCommand]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Handle common keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b":
            e.preventDefault();
            executeCommand("bold");
            break;
          case "i":
            e.preventDefault();
            executeCommand("italic");
            break;
          case "u":
            e.preventDefault();
            executeCommand("underline");
            break;
          case "z":
            if (e.shiftKey) {
              e.preventDefault();
              document.execCommand("redo");
            } else {
              e.preventDefault();
              document.execCommand("undo");
            }
            break;
        }
      }
    },
    [executeCommand]
  );

  return (
    <div
      className={cn(
        "border rounded-lg overflow-hidden bg-background",
        className
      )}
    >
      {/* Toolbar */}
      <div className="border-b bg-muted/30 p-2 flex flex-wrap gap-1">
        <div className="flex items-center gap-1 mr-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => document.execCommand("undo")}
            disabled={disabled}
            className="h-8 w-8 p-0"
          >
            <UndoIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => document.execCommand("redo")}
            disabled={disabled}
            className="h-8 w-8 p-0"
          >
            <RedoIcon className="h-4 w-4" />
          </Button>
        </div>

        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleToolbarClick(button)}
            disabled={disabled}
            title={button.title}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}

        {showPreview && (
          <div className="ml-auto flex items-center gap-2">
            <Button
              type="button"
              variant={isPreviewMode ? "ghost" : "primary"}
              size="sm"
              onClick={() => setIsPreviewMode(false)}
              disabled={disabled}
              className="h-8"
            >
              <EditIcon className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              type="button"
              variant={isPreviewMode ? "primary" : "ghost"}
              size="sm"
              onClick={() => setIsPreviewMode(true)}
              disabled={disabled}
              className="h-8"
            >
              <EyeIcon className="h-4 w-4 mr-1" />
              Preview
            </Button>
          </div>
        )}
      </div>

      {/* Editor Content */}
      <div className="relative">
        {isPreviewMode ? (
          <div
            className="p-4 prose prose-sm max-w-none"
            style={{ minHeight, maxHeight, overflowY: "auto" }}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable={!disabled}
            onInput={handleContentChange}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className={cn(
              "p-4 focus:outline-none",
              "prose prose-sm max-w-none",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            style={{ minHeight, maxHeight, overflowY: "auto" }}
            data-placeholder={placeholder}
            dangerouslySetInnerHTML={{ __html: value }}
            suppressContentEditableWarning={true}
          />
        )}

        {!value && !isPreviewMode && (
          <div
            className="absolute top-4 left-4 text-muted-foreground pointer-events-none select-none"
            style={{ fontSize: "14px" }}
          >
            {placeholder}
          </div>
        )}
      </div>

      {/* Hidden file input for image uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">URL</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Link Text (optional)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Link text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setIsLinkModalOpen(false);
                    setLinkUrl("");
                    setLinkText("");
                  }}
                >
                  Cancel
                </Button>
                <Button type="button" onClick={insertLink} disabled={!linkUrl}>
                  Insert Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom styles for the editor */}
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }

        .prose h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.5em 0;
        }

        .prose h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
        }

        .prose h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
        }

        .prose blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
          color: #6b7280;
        }

        .prose pre {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          padding: 1em;
          margin: 1em 0;
          font-family: "Courier New", monospace;
          overflow-x: auto;
        }

        .prose ul,
        .prose ol {
          margin: 1em 0;
          padding-left: 2em;
        }

        .prose li {
          margin: 0.5em 0;
        }

        .prose a {
          color: #3b82f6;
          text-decoration: underline;
        }

        .prose a:hover {
          color: #1d4ed8;
        }

        .prose img {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
          border-radius: 0.375rem;
        }
      `}</style>
    </div>
  );
}
