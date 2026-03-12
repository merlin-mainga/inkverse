"use client";

import { useRef, useState } from "react";
import CoverImage from "./CoverImage";

type CoverEditorProps = {
  value?: string;
  positionX: number;
  positionY: number;
  onPositionChange: (x: number, y: number) => void;
  onFileChange: (file: File | null, previewUrl: string) => void;
  disabled?: boolean;
  label?: string;
  hint?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function CoverEditor({
  value,
  positionX,
  positionY,
  onPositionChange,
  onFileChange,
  disabled = false,
  label = "Ảnh bìa",
  hint = "Kéo trực tiếp ảnh trong khung để căn cho đẹp như card ngoài Trang chủ.",
}: CoverEditorProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dragState = useRef<{
    startX: number;
    startY: number;
    startPosX: number;
    startPosY: number;
    frameWidth: number;
    frameHeight: number;
  } | null>(null);

  const [dragging, setDragging] = useState(false);

  function openPicker() {
    if (disabled) return;
    fileInputRef.current?.click();
  }

  function handleFileChange(file: File | null) {
    if (!file) {
      onFileChange(null, "");
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    onFileChange(file, previewUrl);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled || !value) return;

    const rect = e.currentTarget.getBoundingClientRect();
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: positionX,
      startPosY: positionY,
      frameWidth: rect.width,
      frameHeight: rect.height,
    };

    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current || disabled || !value) return;

    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;

    const nextX = clamp(
      dragState.current.startPosX + (dx / dragState.current.frameWidth) * 100,
      0,
      100
    );
    const nextY = clamp(
      dragState.current.startPosY + (dy / dragState.current.frameHeight) * 100,
      0,
      100
    );

    onPositionChange(Math.round(nextX), Math.round(nextY));
  }

  function handlePointerEnd() {
    dragState.current = null;
    setDragging(false);
  }

  return (
    <div>
      <style>{`
        .cover-editor-btn {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .cover-editor-btn:hover:not(:disabled) {
          opacity: 0.95;
          transform: translateY(-1px);
        }
      `}</style>

      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          color: "rgba(240,230,208,0.45)",
          marginBottom: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>

      <div
        style={{
          border: "1px dashed rgba(201,168,76,0.28)",
          borderRadius: 16,
          padding: 18,
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          style={{
            width: 230,
            maxWidth: "100%",
            margin: "0 auto 14px",
            touchAction: "none",
            cursor: disabled ? "not-allowed" : value ? (dragging ? "grabbing" : "grab") : "default",
            userSelect: "none",
          }}
        >
          <CoverImage
            src={value}
            alt="cover preview"
            positionX={positionX}
            positionY={positionY}
            aspectRatio="3 / 4"
            borderRadius={16}
            style={{
              border: "1px solid rgba(201,168,76,0.18)",
              boxShadow: dragging ? "0 0 0 1px rgba(201,168,76,0.28)" : "none",
            }}
          />
        </div>

        <div
          style={{
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: "#c9a84c",
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          Preview đúng khung card ngoài Trang chủ
        </div>

        <div
          style={{
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: "rgba(240,230,208,0.36)",
            lineHeight: 1.55,
            marginBottom: 14,
          }}
        >
          {hint}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            className="cover-editor-btn"
            onClick={openPicker}
            disabled={disabled}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(201,168,76,0.22)",
              background: "rgba(201,168,76,0.08)",
              color: "#c9a84c",
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Chọn ảnh bìa
          </button>

          <button
            type="button"
            className="cover-editor-btn"
            onClick={() => onPositionChange(50, 50)}
            disabled={disabled || !value}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(240,230,208,0.75)",
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Căn giữa lại
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        />
      </div>
    </div>
  );
}