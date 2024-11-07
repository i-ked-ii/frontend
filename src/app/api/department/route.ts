/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import axios from "axios";
import { SummaryByDepartment, DefaultUserNotFormatted } from "@/type/types";

type User = {
  firstName: string;
  lastName: string;
  age: number;
  gender: "male" | "female";
  hair: { color: string };
  address: { postalCode: string };
  department?: string;
  company: { department: string };
};

type Summary = {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
};

type DepartmentSummary = Record<string, Summary>;

export async function fetchData(): Promise<DefaultUserNotFormatted[]> {
  const response = await axios.get("https://dummyjson.com/users");
  return response.data.users as DefaultUserNotFormatted[];
}

export function calculateAgeRange(currentRange: string, age: number): string {
  if (!currentRange) return `${age}-${age}`;
  const [min, max] = currentRange.split("-").map(Number);
  return `${Math.min(min, age)}-${Math.max(max, age)}`;
}

export function transformData(users: User[]): SummaryByDepartment {
  const summary: SummaryByDepartment = {};
  users.forEach((user) => {
    const { department, gender, age, hair, firstName, lastName, address, company } =
      user;
    const deptName = company.department;
    const dept = summary[deptName] || {
      male: 0,
      female: 0,
      ageRange: "",
      hair: {},
      addressUser: {},
    };
    const genderLower = gender?.toLowerCase() as "male" | "female";
    dept[genderLower] += 1;
    dept.hair[hair.color] = (dept.hair[hair.color] || 0) + 1;
    dept.addressUser[`${firstName}${lastName}`] = address.postalCode;
    dept.ageRange = calculateAgeRange(dept.ageRange, age);
    summary[deptName] = dept;
  });
  return summary;
}

export function formatUser(users: DefaultUserNotFormatted[]): User[] {
  return users.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    hair: { color: user.hair.color },
    address: { postalCode: user.address.postalCode },
    department: user.company.department,
    company: {
      department: user.company.department,
    },
  }));
}

export async function fetchAndTransformData(): Promise<DepartmentSummary> {
  const users: DefaultUserNotFormatted[] = await fetchData();
  const formattedUsers = formatUser(users);

  const summary: DepartmentSummary = {};

  formattedUsers.forEach((user) => {
    const {
      firstName,
      lastName,
      age,
      gender,
      hair: { color },
      address: { postalCode },
      department,
    } = user;

    if (!department) return;

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
    const genderLower = gender.toLowerCase() as "male" | "female";

    deptSummary[genderLower] += 1;
    deptSummary.ageRange = calculateAgeRange(deptSummary.ageRange, age);
    deptSummary.hair[color] = (deptSummary.hair[color] || 0) + 1;
    deptSummary.addressUser[`${firstName}${lastName}`] = postalCode;
  });

  return summary;
}

export async function GET() {
  try {
    const users = await fetchData();
    const userFormat = formatUser(users);
    const summary = transformData(users);
    return NextResponse.json({
      users: userFormat,
      summary,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
  // const summary = await fetchAndTransformData();
  // return NextResponse.json(summary);
}
