import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'

export const apiSlice = createApi({
    tagTypes: ['Product', 'User', 'Order'],
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (builder) => ({
        // here we will be adding endpoints
    })
})