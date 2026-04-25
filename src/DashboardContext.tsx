import { createContext, useContext } from "react";
import { useGetAllUsersQuery } from "./userAPI";
import type { IUser } from "./types";

type DashboardContextType = {
    users: IUser[];
    totalUsers: number;
    companies: number;
    countries: number;
    averageAge: number;
    maleCount: number;
    femaleCount: number;
    topGender: string;
    findUserByAnyField: (query: string) => IUser[] | undefined;
};
export const DashboardContext = createContext<DashboardContextType>({
    users: [],
    totalUsers: 0,
    companies: 0,
    countries: 0,
    averageAge: 0,
    maleCount: 0,   
    femaleCount: 0,
    topGender: "Поровну",
    findUserByAnyField: () => undefined
});


export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data } = useGetAllUsersQuery();
    const users = data?.users || [];
    const totalUsers = users.length;
    const companies = new Set(users.map((user) => user.company.name)).size;
    const countries = new Set(users.map((user) => user.address.country)).size;
    const averageAge = totalUsers
        ? Math.round(users.reduce((acc, user) => acc + user.age, 0) / totalUsers)
        : 0;

    const maleCount = users.filter((user) => user.gender === "male").length;
    const femaleCount = users.filter((user) => user.gender === "female").length;
    const topGender =
        maleCount === femaleCount
            ? "Поровну"
            : maleCount > femaleCount
                ? "Больше мужчин"
                : "Больше женщин";


    const findUserByAnyField = (query: string): IUser[] | undefined => {
        return users.filter((user) => (user.firstName.toLowerCase().includes(query.toLowerCase()) ||
            user.lastName.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase()) ||
            user.company.name.toLowerCase().includes(query.toLowerCase()) ||
            user.address.country.toLowerCase().includes(query.toLowerCase())));
    };
    
    const contextValue: DashboardContextType = {
        users,
        totalUsers,
        companies,
        countries,
        averageAge,
        maleCount,
        femaleCount,
        topGender,
        findUserByAnyField
    };



    return (
        <DashboardContext.Provider value={contextValue}>
            {children}
        </DashboardContext.Provider>
    )
};

export const useDashboardContext = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboardContext must be used within a DashboardProvider");
    }
    return context;
};
