import { MAX_PRAVATAR_IMAGES, MOBILE_BREAKPOINT } from "../constants";

export const removeAccents = (str: string): string =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const isMobile = (): boolean =>
  typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;

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

export const generateRandomAvatars = (count: number = 12): string[] => {
  const indices = Array.from({ length: MAX_PRAVATAR_IMAGES }, (_, i) => i + 1);
  const shuffled = shuffleArray(indices).slice(0, count);
  return shuffled.map((i) => `https://i.pravatar.cc/150?img=${i}`);
};
