'use client';

import { useEffect, useState } from 'react';
import { SummaryByDepartment } from '@/type/types';

export default function Home() {
    const [summary, setSummary] = useState<SummaryByDepartment | null>(null);

    useEffect(() => {
        async function fetchSummary() {
            const response = await fetch('/api/department');
            const data: SummaryByDepartment = await response.json();
            setSummary(data);
        }
        fetchSummary();
    }, []);

    if (!summary) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Department Summary</h1>
            {Object.entries(summary).map(([department, data]) => (
                <div key={department} className="mb-8">
                    <h2 className="text-xl font-semibold">{department}</h2>
                    <p>Male: {data.male}</p>
                    <p>Female: {data.female}</p>
                    <p>Age Range: {data.ageRange}</p>
                    <div>
                        <h3 className="font-semibold">Hair Colors:</h3>
                        <ul>
                            {Object.entries(data.hair).map(([color, count]) => (
                                <li key={color}>
                                    {color}: {count}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold">Addresses:</h3>
                        <ul>
                            {Object.entries(data.addressUser).map(([name, postalCode]) => (
                                <li key={name}>
                                    {name}: {postalCode}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}