export const getSavedAvatar = (id?: number | string, name?: string, email?: string): string | null => {
  const keysToTry: string[] = [];

  if (id) {
    keysToTry.push(`candidate_avatar_${id}`);
  }
  if (email) {
    keysToTry.push(`candidate_avatar_${email.toLowerCase()}`);
  }
  if (name) {
    const rawName = name.toLowerCase().trim();
    keysToTry.push(`candidate_avatar_${rawName}`);
    keysToTry.push(`candidate_avatar_${rawName.replace(/\s+/g, "_")}`);
    keysToTry.push(`candidate_avatar_${rawName.replace(/[^a-z0-9]/g, "")}`);
  }

  for (const key of keysToTry) {
    const val = localStorage.getItem(key);
    if (val) return val;
  }

  // Strict: if this candidate has no uploaded photo, return null (do NOT fall back to other candidates' photos!)
  return null;
};

export const saveCandidateAvatar = (avatarBase64: string, id?: number | string, name?: string, email?: string) => {
  // Clear any old generic global keys so they don't leak to other candidates
  localStorage.removeItem("candidate_avatar_latest");
  localStorage.removeItem("bgv_global_candidate_avatar");

  if (id) {
    localStorage.setItem(`candidate_avatar_${id}`, avatarBase64);
  }
  if (email) {
    localStorage.setItem(`candidate_avatar_${email.toLowerCase()}`, avatarBase64);
  }
  if (name) {
    const rawName = name.toLowerCase().trim();
    localStorage.setItem(`candidate_avatar_${rawName}`, avatarBase64);
    localStorage.setItem(`candidate_avatar_${rawName.replace(/\s+/g, "_")}`, avatarBase64);
    localStorage.setItem(`candidate_avatar_${rawName.replace(/[^a-z0-9]/g, "")}`, avatarBase64);
  }
};

export const removeCandidateAvatar = (id?: number | string, name?: string, email?: string) => {
  localStorage.removeItem("candidate_avatar_latest");
  localStorage.removeItem("bgv_global_candidate_avatar");

  if (id) localStorage.removeItem(`candidate_avatar_${id}`);
  if (email) localStorage.removeItem(`candidate_avatar_${email.toLowerCase()}`);
  if (name) {
    const rawName = name.toLowerCase().trim();
    localStorage.removeItem(`candidate_avatar_${rawName}`);
    localStorage.removeItem(`candidate_avatar_${rawName.replace(/\s+/g, "_")}`);
    localStorage.removeItem(`candidate_avatar_${rawName.replace(/[^a-z0-9]/g, "")}`);
  }
};

export const clearAuthSession = () => {
  const preservedItems: { [key: string]: string } = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith("candidate_avatar_") || key === "theme")) {
      // Clean up old global key if present
      if (key === "candidate_avatar_latest" || key === "bgv_global_candidate_avatar") continue;
      const val = localStorage.getItem(key);
      if (val) {
        preservedItems[key] = val;
      }
    }
  }

  localStorage.clear();

  Object.keys(preservedItems).forEach((key) => {
    localStorage.setItem(key, preservedItems[key]);
  });
};
