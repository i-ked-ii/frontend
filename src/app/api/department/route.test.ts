import { transformData, calculateAgeRange, fetchAndTransformData } from './route';
import { User } from '@/type/types';

describe('transformData', () => {
    it('should group users by department and summarize data correctly', () => {
        const users: User[] = [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                age: 28,
                gender: 'male',
                hair: { color: 'Black' },
                address: { postalCode: '12345' },
                department: 'Engineering'
            },
            {
                id: 2,
                firstName: 'Jane',
                lastName: 'Doe',
                age: 34,
                gender: 'female',
                hair: { color: 'Blond' },
                address: { postalCode: '67890' },
                department: 'Engineering'
            }
        ];

        const result = transformData(users);
        expect(result).toEqual({
            Engineering: {
                male: 1,
                female: 1,
                ageRange: '28-34',
                hair: { Black: 1, Blond: 1 },
                addressUser: { JohnDoe: '12345', JaneDoe: '67890' }
            }
        });
    });
});

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

    expect(data).toHaveProperty("General");
    expect(data["General"]).toEqual(
      expect.objectContaining({
        male: expect.any(Number),
        female: expect.any(Number),
        ageRange: expect.any(String),
        hair: expect.any(Object),
        addressUser: expect.any(Object),
      })
    );

    expect(data["General"].hair).toHaveProperty("Brown");
  });
});
