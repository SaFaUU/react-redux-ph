import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
    user: {
        email: '',
        role: '',
    },
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

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (email, thunkAPI) => {
        const res = await fetch(`${process.env.REACT_APP_DEV_URL}/user/${email}`);
        const data = await res.json();
        console.log(data);
        if (data.status) {

            return data
        }
        return email;
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = {
                email: '',
                role: '',
            };
        },
        setUser: {
            reducer: (state, action) => {
                state.user.email = action.payload;
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
                state.user.email = '';
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
                state.user.email = action.payload;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.user.email = '';
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
                state.user.email = action.payload;

            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.user.email = '';
                state.error = action.error.message
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false
                state.error = ''
            })
            .addCase(getUser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isLoading = false;

                if (action.payload.status) {
                    state.user = action.payload.data
                }
                else {
                    state.user.email = action.email;
                }
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.user.email = '';
                state.error = action.error.message
            })
    }
})

export const { logOut, setUser, toggleLoading } = authSlice.actions;


export default authSlice.reducer;