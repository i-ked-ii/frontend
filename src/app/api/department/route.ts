/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { User, SummaryByDepartment } from '@/type/types';

// async function fetchData(): Promise<User[]> {
//     const response = await axios.get('https://dummyjson.com/users');
//     return response.data.users as User[];
// }

// export function transformData(users: User[]): SummaryByDepartment {
//     const summary: SummaryByDepartment = {};

//     users.forEach((user) => {
//         const { department, gender, age, hair, firstName, lastName, address } = user;
//         const dept = summary[department] || { male: 0, female: 0, ageRange: '', hair: {}, addressUser: {} };
//         dept[gender.toLowerCase()] += 1;
//         dept.hair[hair.color] = (dept.hair[hair.color] || 0) + 1;
//         dept.addressUser[`${firstName}${lastName}`] = address.postalCode;
//         dept.ageRange = calculateAgeRange(dept.ageRange, age);

//         summary[department] = dept;
//     });

//     return summary;
// }

// export function calculateAgeRange(currentRange: string, age: number): string {
//     if (!currentRange) return `${age}-${age}`;
//     const [min, max] = currentRange.split('-').map(Number);
//     return `${Math.min(min, age)}-${Math.max(max, age)}`;
// }

// export async function GET() {
//     try {
//         const users = await fetchData();
//         const summary = transformData(users);
//         return NextResponse.json(summary);
//     } catch (error: any) {
//         return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
//     }
// }

import { NextResponse } from 'next/server';
import axios from 'axios';

type User = {
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  hair: { color: string };
  address: { postalCode: string };
  department?: string;
};

type Summary = {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
};

type DepartmentSummary = Record<string, Summary>;

export async function fetchAndTransformData(): Promise<DepartmentSummary> {
  const response = await axios.get('https://dummyjson.com/users');
  const users: User[] = response.data.users;

  const summary: DepartmentSummary = {};

  users.forEach((user) => {
    const {
      firstName,
      lastName,
      age,
      gender,
      hair: { color },
      address: { postalCode },
      department = 'General',
    } = user;

    if (!summary[department]) {
      summary[department] = {
        male: 0,
        female: 0,
        ageRange: `${age}-${age}`,
        hair: {},
        addressUser: {},
      };
    }

    const deptSummary = summary[department];

    deptSummary[gender] += 1;
    deptSummary.ageRange = updateAgeRange(deptSummary.ageRange, age);
    deptSummary.hair[color] = (deptSummary.hair[color] || 0) + 1;
    deptSummary.addressUser[`${firstName}${lastName}`] = postalCode;
  });

  return summary;
}

function updateAgeRange(currentRange: string, age: number): string {
  const [min, max] = currentRange.split('-').map(Number);
  return `${Math.min(min, age)}-${Math.max(max, age)}`;
}

export async function GET() {
  const summary = await fetchAndTransformData();
  return NextResponse.json(summary);
}