"use client";

import { useState, useEffect } from "react";

interface CharacterProfile {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  sourceType: string;
  primaryImageUrl: string;
  galleryJson: unknown;
  canonSummary: string;
  appearanceNotes: string;
  mustPreserve: string;
  avoidDrift: string | null;
  styleAffinity: string | null;
  colorMode: string;
  createdAt: string;
  updatedAt: string;
}

interface CharacterDetailModalProps {
  character: CharacterProfile;
  onClose: () => void;
  onSave: (updated: CharacterProfile) => void;
  onDelete: (id: string) => void;
}

export default function CharacterDetailModal({
  character,
  onClose,
  onSave,
  onDelete,
}: CharacterDetailModalProps) {
  const [form, setForm] = useState({
    name: character.name,
    description: character.description || "",
    primaryImageUrl: character.primaryImageUrl,
    canonSummary: character.canonSummary,
    appearanceNotes: character.appearanceNotes,
    mustPreserve: character.mustPreserve,
    avoidDrift: character.avoidDrift || "",
    styleAffinity: character.styleAffinity || "",
    colorMode: character.colorMode,
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorModeChange = (mode: "monochrome" | "color" | "unspecified") => {
    setForm((prev) => ({ ...prev, colorMode: mode }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError("Tên nhân vật là bắt buộc.");
      return;
    }
    if (!form.canonSummary.trim()) {
      setError("Canon Summary là bắt buộc.");
      return;
    }
    if (!form.appearanceNotes.trim()) {
      setError("Appearance Notes là bắt buộc.");
      return;
    }
    if (!form.mustPreserve.trim()) {
      setError("Must Preserve là bắt buộc.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/mainga-lab/characters/${character.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          description: form.description.trim() || null,
          primaryImageUrl: form.primaryImageUrl.trim(),
          canonSummary: form.canonSummary.trim(),
          appearanceNotes: form.appearanceNotes.trim(),
          mustPreserve: form.mustPreserve.trim(),
          avoidDrift: form.avoidDrift.trim() || null,
          styleAffinity: form.styleAffinity.trim() || null,
          colorMode: form.colorMode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Không thể lưu thay đổi.");
        return;
      }

      onSave(data.character);
      onClose();
    } catch {
      setError("Lỗi kết nối khi lưu thay đổi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError("");

    try {
      const res = await fetch(`/api/mainga-lab/characters/${character.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Không thể xóa nhân vật.");
        return;
      }

      onDelete(character.id);
      onClose();
    } catch {
      setError("Lỗi kết nối khi xóa nhân vật.");
    } finally {
      setDeleting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid rgba(201,168,76,0.18)",
    background: "rgba(255,255,255,0.04)",
    color: "#f0e6d0",
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    color: "#c9a84c",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: 6,
    fontWeight: 700,
    display: "block",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !saving && !deleting) {
          onClose();
        }
      }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "relative",
          background: "#0d0d0d",
          border: "1px solid rgba(201,168,76,0.22)",
          borderRadius: 18,
          width: "100%",
          maxWidth: 720,
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          animation: "fadeUp 0.3s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(201,168,76,0.12)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 14,
                color: "#c9a84c",
                letterSpacing: "0.08em",
              }}
            >
              CHARACTER CANON
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                fontWeight: 800,
                color: "#f5eedf",
                lineHeight: 1.2,
              }}
            >
              {isEditing ? "Chỉnh sửa" : character.name}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: "rgba(201,168,76,0.15)",
                  color: "#c9a84c",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setForm({
                    name: character.name,
                    description: character.description || "",
                    primaryImageUrl: character.primaryImageUrl,
                    canonSummary: character.canonSummary,
                    appearanceNotes: character.appearanceNotes,
                    mustPreserve: character.mustPreserve,
                    avoidDrift: character.avoidDrift || "",
                    styleAffinity: character.styleAffinity || "",
                    colorMode: character.colorMode,
                  });
                  setError("");
                }}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent",
                  color: "rgba(240,230,208,0.5)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            )}

            <button
              onClick={onClose}
              disabled={saving || deleting}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "transparent",
                color: "rgba(240,230,208,0.5)",
                fontSize: 18,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            padding: 24,
            overflowY: "auto",
            flex: 1,
          }}
        >
          {/* Primary Image */}
          <div style={{ marginBottom: 24 }}>
            <div style={labelStyle}>Primary Image</div>
            {isEditing ? (
              <input
                name="primaryImageUrl"
                value={form.primaryImageUrl}
                onChange={handleChange}
                placeholder="URL ảnh primary..."
                style={{ ...inputStyle }}
              />
            ) : form.primaryImageUrl ? (
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid rgba(201,168,76,0.12)",
                }}
              >
                <img
                  src={form.primaryImageUrl}
                  alt={form.name}
                  style={{
                    width: "100%",
                    maxHeight: 280,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  border: "1px dashed rgba(201,168,76,0.18)",
                  borderRadius: 12,
                  padding: 24,
                  textAlign: "center",
                  background: "rgba(255,255,255,0.01)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "rgba(240,230,208,0.38)",
                  }}
                >
                  Chưa có primary image
                </div>
              </div>
            )}
          </div>

          {/* Two column layout for fields */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {/* Name */}
            <div>
              <label style={labelStyle}>Name *</label>
              {isEditing ? (
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tên nhân vật..."
                  style={inputStyle}
                />
              ) : (
                <div
                  style={{
                    ...inputStyle,
                    background: "transparent",
                    border: "none",
                    paddingLeft: 0,
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  {form.name}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label style={labelStyle}>Description</label>
              {isEditing ? (
                <input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Mô tả ngắn..."
                  style={inputStyle}
                />
              ) : (
                <div
                  style={{
                    ...inputStyle,
                    background: "transparent",
                    border: "none",
                    paddingLeft: 0,
                    color: "rgba(240,230,208,0.7)",
                  }}
                >
                  {form.description || "—"}
                </div>
              )}
            </div>

            {/* Source Type */}
            <div>
              <label style={labelStyle}>Source Type</label>
              <div
                style={{
                  ...inputStyle,
                  background: "transparent",
                  border: "none",
                  paddingLeft: 0,
                }}
              >
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.16)",
                    color: "#c9a84c",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {character.sourceType}
                </span>
              </div>
            </div>

            {/* Color Mode */}
            <div>
              <label style={labelStyle}>Color Mode</label>
              {isEditing ? (
                <div style={{ display: "flex", gap: 8 }}>
                  {(["unspecified", "monochrome", "color"] as const).map((mode) => {
                    const active = form.colorMode === mode;
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => handleColorModeChange(mode)}
                        style={{
                          padding: "8px 12px",
                          borderRadius: 999,
                          border: active ? "none" : "1px solid rgba(201,168,76,0.16)",
                          background: active
                            ? "linear-gradient(135deg,#c9a84c,#8b6914)"
                            : "rgba(255,255,255,0.03)",
                          color: active ? "#080808" : "#f0e6d0",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          fontWeight: active ? 700 : 500,
                          cursor: "pointer",
                          textTransform: "capitalize",
                        }}
                      >
                        {mode}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div
                  style={{
                    ...inputStyle,
                    background: "transparent",
                    border: "none",
                    paddingLeft: 0,
                  }}
                >
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "rgba(201,168,76,0.1)",
                      border: "1px solid rgba(201,168,76,0.16)",
                      color: "#c9a84c",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    {form.colorMode}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Canon Summary */}
          <div style={{ marginTop: 20 }}>
            <label style={labelStyle}>Canon Summary *</label>
            {isEditing ? (
              <textarea
                name="canonSummary"
                value={form.canonSummary}
                onChange={handleChange}
                placeholder="Tóm tắt bản sắc nhân vật cho prompt injection..."
                rows={4}
                style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
              />
            ) : (
              <div
                style={{
                  ...inputStyle,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: 12,
                  padding: 14,
                  color: "rgba(240,230,208,0.8)",
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                }}
              >
                {form.canonSummary}
              </div>
            )}
          </div>

          {/* Appearance Notes */}
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Appearance Notes *</label>
            {isEditing ? (
              <textarea
                name="appearanceNotes"
                value={form.appearanceNotes}
                onChange={handleChange}
                placeholder="Mô tả tóc, mắt, khuôn mặt, silhouette, trang phục, vibe..."
                rows={5}
                style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
              />
            ) : (
              <div
                style={{
                  ...inputStyle,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: 12,
                  padding: 14,
                  color: "rgba(240,230,208,0.8)",
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                }}
              >
                {form.appearanceNotes}
              </div>
            )}
          </div>

          {/* Must Preserve */}
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Must Preserve *</label>
            {isEditing ? (
              <textarea
                name="mustPreserve"
                value={form.mustPreserve}
                onChange={handleChange}
                placeholder="Các trait không được drift: kiểu tóc, mắt, dấu nhận diện..."
                rows={3}
                style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
              />
            ) : (
              <div
                style={{
                  ...inputStyle,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: 12,
                  padding: 14,
                  color: "rgba(240,230,208,0.8)",
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                }}
              >
                {form.mustPreserve}
              </div>
            )}
          </div>

          {/* Avoid Drift */}
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Avoid Drift</label>
            {isEditing ? (
              <textarea
                name="avoidDrift"
                value={form.avoidDrift}
                onChange={handleChange}
                placeholder="Những lỗi model hay trôi: đổi màu tóc, sai tuổi, lệch khí chất..."
                rows={3}
                style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
              />
            ) : (
              <div
                style={{
                  ...inputStyle,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: 12,
                  padding: 14,
                  color: "rgba(240,230,208,0.8)",
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                }}
              >
                {form.avoidDrift || "—"}
              </div>
            )}
          </div>

          {/* Style Affinity */}
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Style Affinity</label>
            {isEditing ? (
              <input
                name="styleAffinity"
                value={form.styleAffinity}
                onChange={handleChange}
                placeholder="Phong cách họa: anime, manga, comic..."
                style={inputStyle}
              />
            ) : (
              <div
                style={{
                  ...inputStyle,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: 12,
                  padding: 14,
                  color: "rgba(240,230,208,0.8)",
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                }}
              >
                {form.styleAffinity || "—"}
              </div>
            )}
          </div>

          {/* Timestamps */}
          <div
            style={{
              marginTop: 24,
              paddingTop: 16,
              borderTop: "1px solid rgba(201,168,76,0.08)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <div>
              <div style={{ ...labelStyle, marginBottom: 4 }}>Created</div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "rgba(240,230,208,0.35)",
                }}
              >
                {new Date(character.createdAt).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div>
              <div style={{ ...labelStyle, marginBottom: 4 }}>Updated</div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "rgba(240,230,208,0.35)",
                }}
              >
                {new Date(character.updatedAt).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                marginTop: 16,
                padding: 12,
                borderRadius: 8,
                background: "rgba(255,80,80,0.08)",
                border: "1px solid rgba(255,80,80,0.2)",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#ff6b6b",
                lineHeight: 1.5,
              }}
            >
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid rgba(201,168,76,0.12)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {/* Delete */}
          <div>
            {showDeleteConfirm ? (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "rgba(240,230,208,0.6)",
                  }}
                >
                  Xóa vĩnh viễn?
                </span>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 6,
                    border: "none",
                    background: "#dc3545",
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: deleting ? "not-allowed" : "pointer",
                    opacity: deleting ? 0.7 : 1,
                  }}
                >
                  {deleting ? "Đang xóa..." : "Xóa"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 6,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: "rgba(240,230,208,0.5)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Hủy
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={saving || deleting}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(220,53,69,0.3)",
                  background: "transparent",
                  color: "rgba(220,53,69,0.7)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: saving || deleting ? "not-allowed" : "pointer",
                  opacity: saving || deleting ? 0.5 : 1,
                }}
              >
                Delete
              </button>
            )}
          </div>

          {/* Save */}
          <div style={{ display: "flex", gap: 10 }}>
            {isEditing && (
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: "10px 20px",
                  borderRadius: 8,
                  border: "none",
                  background: "linear-gradient(135deg,#c9a84c,#8b6914)",
                  color: "#080808",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: saving ? "not-allowed" : "pointer",
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? "Đang lưu..." : "Save Changes"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
