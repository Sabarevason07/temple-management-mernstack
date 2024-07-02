import { createSlice } from "@reduxjs/toolkit";
import { blockUser } from "../api/api"; // Adjust this import based on your API structure

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [], // Add users array for storing all users
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    blockUserSuccess: (state, action) => {
      // Update user list to reflect blocked user
      state.users = state.users.map(user =>
        user._id === action.payload._id ? action.payload : user
      );
    },
    blockUserFailure: (state, action) => {
      console.error("Failed to block user:", action.payload.error);
      // Handle failure if needed
    },
  },
});

export const { setUser, blockUserSuccess, blockUserFailure } = userSlice.actions;

// Async action to block user
export const blockUserAsync = (userId) => async (dispatch) => {
  try {
    // Make API call to block user
    const response = await blockUser(userId); // Call blockUser from your API file

    // Dispatch success action with updated user data
    dispatch(blockUserSuccess(response.data));
  } catch (error) {
    // Dispatch failure action if API call fails
    dispatch(blockUserFailure({ error: error.message }));
  }
};

export default userSlice.reducer;
