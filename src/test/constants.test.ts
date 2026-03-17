import { describe, expect, it } from "vitest";
import {
  DEBOUNCE_MS,
  DEFAULT_LIMIT,
  MAX_PRAVATAR_IMAGES,
  MOBILE_BREAKPOINT,
  PAGE_OPTIONS,
} from "../constants";

describe("Constants", () => {
  describe("MOBILE_BREAKPOINT", () => {
    it("should be a number", () => {
      expect(typeof MOBILE_BREAKPOINT).toBe("number");
    });

    it("should be greater than 0", () => {
      expect(MOBILE_BREAKPOINT).toBeGreaterThan(0);
    });

    it("should be 768", () => {
      expect(MOBILE_BREAKPOINT).toBe(768);
    });
  });

  describe("PAGE_OPTIONS", () => {
    it("should be an array", () => {
      expect(Array.isArray(PAGE_OPTIONS)).toBe(true);
    });

    it("should contain numbers", () => {
      PAGE_OPTIONS.forEach((option) => {
        expect(typeof option).toBe("number");
      });
    });

    it("should be sorted in ascending order", () => {
      for (let i = 1; i < PAGE_OPTIONS.length; i++) {
        expect(PAGE_OPTIONS[i]).toBeGreaterThan(PAGE_OPTIONS[i - 1]);
      }
    });
  });

  describe("DEFAULT_LIMIT", () => {
    it("should be a number", () => {
      expect(typeof DEFAULT_LIMIT).toBe("number");
    });

    it("should be in PAGE_OPTIONS", () => {
      expect(PAGE_OPTIONS).toContain(DEFAULT_LIMIT);
    });
  });

  describe("DEBOUNCE_MS", () => {
    it("should be a positive number", () => {
      expect(DEBOUNCE_MS).toBeGreaterThan(0);
    });

    it("should be 300", () => {
      expect(DEBOUNCE_MS).toBe(300);
    });
  });

  describe("MAX_PRAVATAR_IMAGES", () => {
    it("should be a positive number", () => {
      expect(MAX_PRAVATAR_IMAGES).toBeGreaterThan(0);
    });

    it("should be 70", () => {
      expect(MAX_PRAVATAR_IMAGES).toBe(70);
    });
  });
});
