import { describe, it, expect } from "vitest";
import { courseSchema } from "./course.schema";

describe("courseSchema", () => {
  it("acepta un curso con título", () => {
    expect(courseSchema.parse({ title: "Desarrollo Web" })).toEqual({ title: "Desarrollo Web" });
  });

  it("rechaza un curso sin título", () => {
    expect(() => courseSchema.parse({})).toThrow();
  });
});
