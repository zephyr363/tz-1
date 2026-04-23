import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {type IUser} from "./types";

const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://dummyjson.com/users'}),
    endpoints: (build) => ({
        getAllUsers: build.query<{users: IUser[]}, void>({
            query: () => '/',
        }),
    }),
})

export const {useGetAllUsersQuery} = userAPI;
export default userAPI;