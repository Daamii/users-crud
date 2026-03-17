import { describe, expect, it } from "vitest";
import { formatDate, removeAccents } from "../utils";

describe("removeAccents", () => {
  it("should remove accents from string", () => {
    expect(removeAccents("café")).toBe("cafe");
  });

  it("should remove multiple accents", () => {
    expect(removeAccents("café relación")).toBe("cafe relacion");
  });

  it("should return same string if no accents", () => {
    expect(removeAccents("hello world")).toBe("hello world");
  });

  it("should handle empty string", () => {
    expect(removeAccents("")).toBe("");
  });

  it("should handle special characters", () => {
    expect(removeAccents("áéíóú")).toBe("aeiou");
  });
});

describe("formatDate", () => {
  it("should format date correctly", () => {
    const result = formatDate("2024-01-15T10:30:00Z");
    expect(result).toContain("15");
    expect(result).toContain("2024");
  });

  it("should handle different dates", () => {
    const result = formatDate("2025-06-22T14:30:00Z");
    expect(result).toContain("22");
    expect(result).toContain("2025");
  });

  it("should handle invalid date gracefully", () => {
    const result = formatDate("invalid-date");
    expect(result).toContain("Invalid");
  });
});
