'use client'

import * as PDFJS from "pdfjs-dist";
import type {
  PDFDocumentProxy,
  RenderParameters,
} from "pdfjs-dist/types/src/display/api";
import { useCallback, useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

PDFJS.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@4.9.155/build/pdf.worker.min.mjs";

export interface PdfProps {
  src: string;
  height?: number;
}

export default function EnhancedPdfViewer({ src }: PdfProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<PDFJS.RenderTask | null>(null); // Use useRef for renderTask
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy>();
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.5);

  const renderPage = useCallback(
    (pageNum: number, pdf = pdfDoc) => {
      const canvas = canvasRef.current;
      if (!canvas || !pdf) return;

      pdf.getPage(pageNum).then((page) => {
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext: RenderParameters = {
          canvasContext: canvas.getContext("2d")!,
          viewport: viewport,
        };

        // Cancel any ongoing rendering task
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        // Start rendering the new page
        renderTaskRef.current = page.render(renderContext);
        renderTaskRef.current.promise.catch((error) => {
          if (error?.name !== "RenderingCancelledException") {
            console.error("Error rendering PDF:", error);
          }
        });
      });
    },
    [pdfDoc, scale]
  );

  useEffect(() => {
    renderPage(currentPage, pdfDoc);
  }, [pdfDoc, currentPage, renderPage, scale]);

  useEffect(() => {
    const loadingTask = PDFJS.getDocument(src);
    loadingTask.promise.then(
      (loadedDoc) => {
        setPdfDoc(loadedDoc);
      },
      (error) => {
        console.error("Error loading PDF:", error);
      }
    );
  }, [src]);

  const nextPage = () =>
    pdfDoc && currentPage < pdfDoc.numPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const zoomIn = () => setScale((prevScale) => prevScale + 0.25);
  const zoomOut = () => setScale((prevScale) => Math.max(0.5, prevScale - 0.25));

  return (
    <div className="flex w-full h-full flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md" >
      <div className="flex justify-between items-center w-full mb-4">
        <button
          onClick={prevPage}
          disabled={currentPage <= 1}
          className="bg-blue-500/70 hover:bg-blue-500/80 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-lg font-semibold">
          Page {currentPage} of {pdfDoc?.numPages || '-'}
        </div>
        <button
          onClick={nextPage}
          disabled={currentPage >= (pdfDoc?.numPages ?? -1)}
          className="bg-blue-500/70 hover:bg-blue-500/80 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="relative flex-grow w-full overflow-auto">
        <canvas ref={canvasRef} className="mx-auto"></canvas>
      </div>
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={zoomOut}
          className="bg-gray-200 text-gray-800 p-2 rounded-full hover:bg-gray-300"
        >
          <ZoomOut size={24} />
        </button>
        <div className="text-lg font-semibold">{Math.round(scale * 100)}%</div>
        <button
          onClick={zoomIn}
          className="bg-gray-200 text-gray-800 p-2 rounded-full hover:bg-gray-300"
        >
          <ZoomIn size={24} />
        </button>
      </div>
    </div>
  );
}
