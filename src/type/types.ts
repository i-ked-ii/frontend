export type User = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    hair: { color: string };
    address: { postalCode: string };
    department: string;
};

export type DepartmentSummary = {
    male: number;
    female: number;
    ageRange: string;
    hair: Record<string, number>;
    addressUser: Record<string, string>;
};

export type SummaryByDepartment = Record<string, DepartmentSummary>;