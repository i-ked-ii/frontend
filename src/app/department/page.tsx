"use client";

import { useEffect, useState } from "react";
import { DataResponseUserAndDepartment, SummaryByDepartment, User } from '@/type/types';
import classNames from "classnames";

export default function Home() {
  const [summary, setSummary] = useState<SummaryByDepartment | null>(null);
  const [userList, setUserList] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [department, setDepartment] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>('All');


  const getDepartmentFromUser = (users: User[]) => {
    const departments = users.map((user) => user.department);
    const uniqueDepartments = Array.from(new Set(departments));
    setDepartment(uniqueDepartments);
  };

  const handleClickFilter = (val: string) => {
    setSelectedDepartment(val);
    filterData(userList, val);
  };

  const fetchSummary = async () => {
    const response = await fetch("/api/department");
    const data: DataResponseUserAndDepartment = await response.json();
    setAllUsers(data.users);
    setUserList(data.users);
    getDepartmentFromUser(data.users);
    setSummary(data.summary);
  };

  const filterData = (data: User[], keyword: string) => {
    if (keyword === "All") {
      setUserList(allUsers);
    } else {
      setUserList(allUsers.filter((item) => item.department === keyword));
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (!department) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-16">
      <h1 className="text-2xl font-bold mb-4">Department Filter</h1>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          className={classNames("px-4 py-2 text-white", {
              "bg-stone-500": selectedDepartment !== "All",
              "bg-black": selectedDepartment === "All",
            })}
          onClick={() => handleClickFilter("All")}
        >
          All
        </button>
        {department.map((department: string) => (
          <button
            className={classNames("px-4 py-2 text-white", {
              "bg-stone-500": selectedDepartment !== department,
              "bg-black": selectedDepartment === department,
            })}
            key={department}
            onClick={() => handleClickFilter(department)}
          >
            {department}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {userList && userList.map((user: User, index) => (
          <div key={index} className="border border-stone-500 p-4">
            <h2 className="text-xl font-semibold break-words mb-4">
              {department}
            </h2>
            <p>
              Name: {user.firstName} {user.lastName}
            </p>
            <p>Gender: {user.gender}</p>
            <p>Age: {user.age}</p>
            <p>Department: {user.department}</p>
            <div>
              <h3 className="font-semibold">Hair Colors:</h3>
              <ul>
                {Object.entries(user.hair).map(([color, count]) => (
                  <li key={color}>
                    {color}: {count}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Addresses:</h3>
              <p>{user.address.postalCode}</p>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-bold mb-4">Department Summary</h1>
      {summary && Object.entries(summary).map(([department, data]) => (
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
