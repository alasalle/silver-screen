export function emailTrim(email) {
  return email.substring(0, email.lastIndexOf("@"));
}
