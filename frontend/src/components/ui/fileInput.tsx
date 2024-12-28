"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { File as FileIcon, Trash2, Upload } from "lucide-react";
import clsx from "clsx";

export interface FileInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "id"
  > {
  label?: string;
  subLabel?: string;
  selectedFile: File | null;
  hasError?: boolean;
  onFileChange: (file: File | null) => void;
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput(
    {
      label = "Click here to upload a file",
      subLabel = "TXT (max. 500Kb)",
      selectedFile,
      onFileChange,
      hasError,
      className,
      ...props
    },
    externalRef,
  ) {
    const id = React.useId();

    const innerRef = React.useRef<HTMLInputElement | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const newFile = e.target.files?.[0] || null;
      onFileChange(newFile);
    }

    function removeFile() {
      onFileChange(null);
      if (innerRef.current) {
        innerRef.current.value = "";
      }
    }

    return (
      <div className={clsx("w-full", className)}>
        <Input
          ref={(node) => {
            if (typeof externalRef === "function") externalRef(node);
            else if (externalRef)
              (
                externalRef as React.MutableRefObject<HTMLInputElement | null>
              ).current = node;

            innerRef.current = node;
          }}
          id={id}
          type="file"
          className="hidden"
          onChange={handleChange}
          {...props}
        />

        {selectedFile ? (
          <div
            data-error={hasError}
            className={clsx(
              "group flex items-center justify-between",
              "rounded-md border border-gray-medium p-4",
              "text-sm text-muted-foreground",
              "data-[error=true]:border-red-primary",
            )}
          >
            <div className="flex items-center space-x-3">
              <FileIcon
                className="h-9 w-9 group-data-[error=true]:text-red-primary"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-white font-semibold text-base">
                  {selectedFile.name}
                </span>
                <span className="text-xs text-gray-lighter font-normal">
                  {formatFileSize(selectedFile.size)}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-white hover:text-white"
              aria-label="Remove file"
            >
              <Trash2 className="h-6 w-6" />
            </button>
          </div>
        ) : (
          <Label
            htmlFor={id}
            className={clsx(
              "flex flex-col items-center justify-center",
              "rounded-md border-2 border-dashed border-gray-medium",
              "p-6 text-center text-base text-white",
              "transition hover:border-gray-400 hover:bg-gray-medium",
              "cursor-pointer",
            )}
          >
            <Upload className="mb-4 h-9 w-9 text-white" aria-hidden="true" />
            <span>{label}</span>
            <span className="mt-1 text-sm text-gray-lighter">{subLabel}</span>
          </Label>
        )}
      </div>
    );
  },
);

/** Convert file size to e.g. "500 KB" */
function formatFileSize(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = 0;
  while (size > 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}
