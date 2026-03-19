import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import profileService from './profileService';

let profileExists = JSON.parse(localStorage.getItem('profile'))


const initialState = {
    profile: profileExists || null,
    profileLoading: false,
    profileSuccess: false,
    profileError: false,
    profileErrorMessage: ""
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state, action) => {
                state.profileLoading = true
                state.profileSuccess = false
                state.profileError = false
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.profileLoading = false
                state.profileSuccess = true
                state.profile = action.payload
                state.profileError = false
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.profileLoading = false
                state.profileSuccess = false
                state.profileError = true
                state.profileErrorMessage = action.payload
            })
            .addCase(follow.pending, (state, action) => {
                state.profileLoading = true
                state.profileSuccess = false
                state.profileError = false
            })
            .addCase(follow.fulfilled, (state, action) => {
                state.profileLoading = false
                state.profileSuccess = true
                state.profile = { ...state.profile, following: [...state.profile.following, action.payload] }
                state.profileError = false
            })
            .addCase(follow.rejected, (state, action) => {
                state.profileLoading = false
                state.profileSuccess = false
                state.profileError = true
                state.profileErrorMessage = action.payload
            })
    }
});

export const { } = profileSlice.actions
export default profileSlice.reducer

export const getProfile = createAsyncThunk("FETCH/PROFILE", async (username, thunkAPI) => {
    try {
        return await profileService.fetchProfile(username)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


export const follow = createAsyncThunk("FOLLOW/PROFILE", async (uid, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await profileService.sendFollowRequest(uid, token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})