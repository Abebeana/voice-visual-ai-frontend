import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface QueryState {
  query: string;
  response: {
    text: string;
    image?: string; // base64 image
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: QueryState = {
  query: '',
  response: null,
  loading: false,
  error: null,
};

// Async thunk to send query to Flask backend
export const sendQuery = createAsyncThunk(
  'query/sendQuery',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to send query');
    }
  }
);

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearQuery: (state) => {
      state.query = '';
      state.response = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(sendQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQuery, clearQuery, clearError } = querySlice.actions;
export default querySlice.reducer;
