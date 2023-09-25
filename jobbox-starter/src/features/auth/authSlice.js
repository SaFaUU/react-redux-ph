import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
    email: '',
    role: '',
    isLoading: true,
    isError: false,
    error: ''
};

export const createUser = createAsyncThunk(
    'auth/createUser',
    async ({ email, password }, thunkAPI) => {
        const data = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        return data.user.email;
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkAPI) => {
        const data = await signInWithEmailAndPassword(
            auth,
            email,
            password
        )
        return data.user.email;
    }
)

export const googleLogin = createAsyncThunk(
    'auth/googleLogin',
    async (_, thunkAPI) => {
        const googleProvider = new GoogleAuthProvider();
        const data = await signInWithPopup(auth, googleProvider);
        return data.user.email;
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.email = '';
        },
        setUser: {
            reducer: (state, action) => {
                state.email = action.payload;
                state.isLoading = false;
            },
        },
        toggleLoading: (state) => {
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false
                state.error = ''
            })
            .addCase(createUser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isLoading = false;
                state.email = action.payload;

            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.email = '';
                state.error = action.error.message
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false
                state.error = ''
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isLoading = false;
                state.email = action.payload;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.email = '';
                state.error = action.error.message
            })
            .addCase(googleLogin.pending, (state) => {
                state.isLoading = true;
                state.isError = false
                state.error = ''
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isLoading = false;
                state.email = action.payload;

            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.email = '';
                state.error = action.error.message
            })
    }
})

export const { logOut, setUser, toggleLoading } = authSlice.actions;


export default authSlice.reducer;