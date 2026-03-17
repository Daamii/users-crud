import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserFormData } from '../types/user';
import { api, FetchUsersParams } from '../services/api';

interface UsersState {
  users: User[];
  selectedUser: User | null;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    role: string;
  };
  sort: string;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  total: 0,
  page: 1,
  limit: 9,
  totalPages: 1,
  loading: false,
  error: null,
  filters: {
    search: '',
    role: ''
  },
  sort: ''
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params: FetchUsersParams = {}) => {
    return await api.getUsers(params);
  }
);

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id: string) => {
  return await api.getUserById(id);
});

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, data }: { id: string; data: UserFormData }) => {
    return await api.updateUser(id, data);
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (data: UserFormData) => {
    return await api.createUser(data);
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string) => {
    await api.deleteUser(id);
    return id;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    setFilters: (state, action: PayloadAction<{ search?: string; role?: string }>) => {
      if (action.payload.search !== undefined) state.filters.search = action.payload.search;
      if (action.payload.role !== undefined) state.filters.role = action.payload.role;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<{ limit: number }>) => {
      state.limit = action.payload.limit;
      state.page = 1;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar usuarios';
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload || null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar usuario';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.selectedUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar usuario';
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al crear usuario';
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(u => u.id !== action.payload);
        state.total -= 1;
        state.selectedUser = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al eliminar usuario';
      });
  }
});

export const { clearSelectedUser, setFilters, setPage, setLimit, setSort } = usersSlice.actions;
export default usersSlice.reducer;