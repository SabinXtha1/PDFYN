"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { useToast } from "@/hooks/use-toast";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  File,
  X,
  FilePlus2,
  FileCheck2,
  Eye,
  UploadCloud,
} from "lucide-react";

export default function PDFMerger() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles) => {
    const pdfFiles = acceptedFiles.filter((file) => file.type === "application/pdf");
    if (pdfFiles.length !== acceptedFiles.length) {
      toast({
        title: "Invalid file type",
        description: "Only PDF files are allowed",
        variant: "destructive",
      });
    }

    setFiles((prev) => [...prev, ...pdfFiles]);
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

 const handlePreview =async () => {
     const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const fileBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(fileBuffer);
        const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfFile = await mergedPdf.save();
      const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const previewWindow = window.open(url, '_blank');
      setTimeout(() => URL.revokeObjectURL(url), 1000);
 
};

  const handleMerge = async () => {
    if (files.length < 2) {
      toast({
        title: "Not enough files",
        description: "Please upload at least 2 PDF files to merge",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const fileBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(fileBuffer);
        const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfFile = await mergedPdf.save();
      const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Success!",
        description: "PDFs merged successfully.",
      });
    } catch (error) {
      console.error("Merge error:", error);
      toast({
        title: "Error",
        description: "Something went wrong while merging PDFs.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-black text-white px-4">
      <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FilePlus2 className="text-primary" />
            <CardTitle className="text-white">PDF Merger</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">
            Drag and drop multiple PDF files to merge them into one document.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div {...getRootProps()} className={`border-2 border-dashed rounded-md p-6 transition-colors duration-200 cursor-pointer
            ${isDragActive ? "border-primary bg-zinc-800" : "border-zinc-700 bg-zinc-800 hover:border-primary/70"}`}>
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-2">
              <UploadCloud className="h-8 w-8 text-primary" />
              <p className="text-white">Drag & drop PDF files here, or click to select</p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-4">
              <Label className="text-white">Selected Files</Label>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded bg-zinc-800 hover:bg-zinc-700 transition"
                  >
                    <div className="flex items-center gap-2">
                      <File className="w-4 h-4 text-primary" />
                      <span className="truncate text-white">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X className="w-4 h-4 text-red-500 hover:text-red-600" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handlePreview}
              variant="secondary"
              disabled={files.length === 0}
              className="bg-zinc-700 text-white hover:bg-zinc-600"
            >
              <Eye className="w-4 h-4 mr-2" /> Preview
            </Button>
            <Button
              onClick={handleMerge}
              className="bg-primary text-white hover:bg-primary/90"
              disabled={files.length < 2 || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <FileCheck2 className="animate-spin w-4 h-4" /> Merging...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4" /> Merge PDFs
                </span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
