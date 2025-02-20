import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = [];

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers:{

    }
})



export const {} = eventSlice.actions;
export default eventSlice.reducer;