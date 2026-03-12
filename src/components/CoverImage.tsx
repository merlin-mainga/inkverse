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
            alignItems: "center",
            justifyContent: "center",
            color: "#c9a84c",
            fontFamily: "'Cinzel', serif",
            fontSize: 28,
            background: "rgba(201,168,76,0.04)",
          }}
        >
          {fallback ?? "M"}
        </div>
      )}
    </div>
  );
}