export const parse_base_64_uid_to_hex = (uid: string): string => {
  return btoa(uid);
};

export const to_base_64 = (s: string) => {
  s = s.replace(/-/g, "");
  s = Buffer.from(s, "hex").toString("base64");
  return s.replaceAll("/", "_").replaceAll("+", "-");
};

export const from_base_64 = (s: string) => {
  s = Buffer.from(s, "base64").toString("hex");
  s = `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(
    16,
    20
  )}-${s.slice(20, 32)}`;
  return s;
};

export const is_base_64 = (s: string) => {
  try {
    return Boolean(atob(s));
  } catch {
    return false;
  }
};

export const is_uuid_v4 = (s: string) => {
  return s.length == 36;
};
