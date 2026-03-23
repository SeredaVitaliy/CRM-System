const MAX_TITLE_LENGTH = 64;
const MIN_TITLE_LENGTH = 2;

export default function titleValidation(title: string) {
  if (!title || title.trim().length === 0) {
    return "Это поле не может быть пустым";
  }
  if (title.trim().length < MIN_TITLE_LENGTH) {
    return `Минимальная длина текста ${MIN_TITLE_LENGTH} символа`;
  }
  if (title.trim().length > MAX_TITLE_LENGTH) {
    return `Максимальная длина текста ${MAX_TITLE_LENGTH} символа`;
  }
  return;
}
