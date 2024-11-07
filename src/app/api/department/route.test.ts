import { calculateAgeRange, fetchAndTransformData } from './route';

describe('calculateAgeRange', () => {
    it('should update the age range correctly', () => {
        expect(calculateAgeRange('25-35', 40)).toBe('25-40');
        expect(calculateAgeRange('', 30)).toBe('30-30');
        expect(calculateAgeRange('20-40', 18)).toBe('18-40');
    });
});

describe("fetchAndTransformData", () => {
  it("returns data grouped by department with the correct structure", async () => {
    const data = await fetchAndTransformData();

    expect(data).toHaveProperty("Engineering");
    expect(data["Engineering"]).toEqual(
      expect.objectContaining({
        male: expect.any(Number),
        female: expect.any(Number),
        ageRange: expect.any(String),
        hair: expect.any(Object),
        addressUser: expect.any(Object),
      })
    );

    expect(data["Engineering"].hair).toHaveProperty("Brown");
  });
});
