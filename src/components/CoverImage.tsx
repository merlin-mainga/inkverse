"use client";

import type { CSSProperties } from "react";

type CoverImageProps = {
  src?: string | null;
  alt?: string;
  positionX?: number;
  positionY?: number;
  aspectRatio?: string;
  borderRadius?: number;
  className?: string;
  style?: CSSProperties;
  fallback?: React.ReactNode;
};

export default function CoverImage({
  src,
  alt = "cover",
  positionX = 50,
  positionY = 50,
  aspectRatio = "3 / 4",
  borderRadius = 14,
  className,
  style,
  fallback,
}: CoverImageProps) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        aspectRatio,
        overflow: "hidden",
        borderRadius,
        background: "rgba(255,255,255,0.03)",
        ...style,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: `${positionX}% ${positionY}%`,
            display: "block",
            userSelect: "none",
            ...( { WebkitUserDrag: "none" } as any ),
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            color: "rgba(201,168,76,0.5)",
            background: "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(201,168,76,0.02) 100%)",
            border: "1px dashed rgba(201,168,76,0.2)",
          }}
        >
          {fallback ?? (
            <>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span style={{ fontSize: 10, letterSpacing: "0.1em" }}>NO COVER</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}