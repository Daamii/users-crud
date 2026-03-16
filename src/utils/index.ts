export const removeAccents = (str: string): string =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const debounce = <T extends (...args: string[]) => void>(
  fn: T,
  ms: number,
): T => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return ((...args: string[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  }) as T;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MAX_PRAVATAR_IMAGES = 70;

export const generateRandomAvatars = (count: number = 12): string[] => {
  const indices = Array.from({ length: MAX_PRAVATAR_IMAGES }, (_, i) => i + 1);
  const shuffled = shuffleArray(indices).slice(0, count);
  return shuffled.map((i) => `https://i.pravatar.cc/150?img=${i}`);
};
