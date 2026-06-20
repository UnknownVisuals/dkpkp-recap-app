"use client";

import { useState, useRef } from "react";
import { uploadLampiran } from "@/lib/actions/storage";

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const upload = async (): Promise<string> => {
    if (!file) return "";
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadLampiran(formData);
      return result.publicUrl;
    } finally {
      setUploading(false);
    }
  };

  return {
    file,
    uploading,
    fileInputRef,
    handleFileChange,
    upload,
    setFile,
  };
}
