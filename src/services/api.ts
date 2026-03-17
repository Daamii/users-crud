import usersData from "../data/users.json";
import { User, UserFormData } from "../types/user";
import { removeAccents } from "../utils";

const shouldUseMockData = () => {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("mock") === "true";
};

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const generateUUID = (): string => {
  return (
    "550e8400-e29b-41d4-a716-" +
    Math.floor(Math.random() * 0xffffffff)
      .toString()
      .padStart(12, "0")
  );
};

export interface FetchUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  sort?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

interface ApiResponse {
  data: ApiUser[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface ApiUser {
  id: string;
  created_at: string;
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
    role: string;
  };
}

const mapApiUser = (apiUser: ApiUser): User => ({
  id: apiUser.id,
  firstName: apiUser.data.firstName || "",
  lastName: apiUser.data.lastName || "",
  email: apiUser.data.email || "",
  phone: apiUser.data.phone || "",
  avatar:
    apiUser.data.avatar ||
    `https://ui-avatars.com/api/?name=${apiUser.data.firstName}+${apiUser.data.lastName}`,
  role: mapRole(apiUser.data.role),
  createdAt: apiUser.created_at,
});

const mapRole = (role?: string): string => {
  const roleMap: Record<string, string> = {
    admin: "Administrador",
    user: "Usuario",
    editor: "Editor",
    moderator: "Moderador",
  };
  return role ? roleMap[role.toLowerCase()] || "Usuario" : "Usuario";
};

const reverseRoleMap: Record<string, string> = {
  Administrador: "admin",
  Usuario: "user",
  Editor: "editor",
  Moderador: "moderator",
};

const usersDb: User[] = [...usersData];

const filterAndSortUsers = (
  users: User[],
  params: FetchUsersParams,
): User[] => {
  let filteredUsers = [...users];

  if (params.search) {
    const searchNormalized = removeAccents(params.search.toLowerCase());
    filteredUsers = filteredUsers.filter((u) => {
      const fullName = removeAccents(
        `${u.firstName} ${u.lastName}`.toLowerCase(),
      );
      const firstNameNorm = removeAccents(u.firstName.toLowerCase());
      const lastNameNorm = removeAccents(u.lastName.toLowerCase());
      const emailNorm = removeAccents(u.email.toLowerCase());

      return (
        fullName.includes(searchNormalized) ||
        firstNameNorm.includes(searchNormalized) ||
        lastNameNorm.includes(searchNormalized) ||
        emailNorm.includes(searchNormalized)
      );
    });
  }

  if (params.role) {
    filteredUsers = filteredUsers.filter((u) => u.role === params.role);
  }

  if (params.sort) {
    const [field, direction] = params.sort.split(":");
    filteredUsers.sort((a, b) => {
      let aVal = "";
      let bVal = "";

      if (field === "name") {
        aVal = `${a.firstName} ${a.lastName}`.toLowerCase();
        bVal = `${b.firstName} ${b.lastName}`.toLowerCase();
      } else if (field === "email") {
        aVal = a.email.toLowerCase();
        bVal = b.email.toLowerCase();
      } else if (field === "role") {
        aVal = a.role.toLowerCase();
        bVal = b.role.toLowerCase();
      }

      if (direction === "desc") {
        return bVal.localeCompare(aVal);
      }
      return aVal.localeCompare(bVal);
    });
  }

  return filteredUsers;
};

const getPaginatedResponse = (
  users: User[],
  page: number,
  limit: number,
): PaginatedResponse<User> => {
  const total = users.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginatedData = users.slice(start, start + limit);

  return {
    data: paginatedData,
    total,
    page,
    totalPages,
    limit,
  };
};

export const api = {
  getUsers: async (
    params: FetchUsersParams = {},
  ): Promise<PaginatedResponse<User>> => {
    await delay(300);

    const page = params.page || 1;
    const limit = params.limit || 9;

    if (shouldUseMockData()) {
      const filteredUsers = filterAndSortUsers(usersDb, params);
      return getPaginatedResponse(filteredUsers, page, limit);
    }

    const hasLocalFilter = !!params.search || !!params.role || !!params.sort;

    if (hasLocalFilter) {
      const allUrl = new URL(API_URL);
      allUrl.searchParams.set("page", "1");
      allUrl.searchParams.set("limit", "500");

      const response = await fetch(allUrl.toString(), {
        headers: { "x-api-key": API_KEY },
      });

      if (!response.ok) {
        throw new Error("Error loading users");
      }

      const json: ApiResponse = await response.json();
      const users = json.data.map(mapApiUser);
      const filteredUsers = filterAndSortUsers(users, params);
      return getPaginatedResponse(filteredUsers, page, limit);
    }

    const url = new URL(API_URL);
    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", String(limit));

    const response = await fetch(url.toString(), {
      headers: { "x-api-key": API_KEY },
    });

    if (!response.ok) {
      throw new Error("Error loading users");
    }

    const json: ApiResponse = await response.json();
    const users = json.data.map(mapApiUser);

    return {
      data: users,
      total: json.meta.total,
      page: json.meta.page,
      totalPages: json.meta.pages,
      limit: json.meta.limit,
    };
  },

  getUserById: async (id: string): Promise<User | undefined> => {
    await delay(300);

    if (shouldUseMockData()) {
      const user = usersDb.find((u) => u.id === id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    }

    const url = `${API_URL}/${id}`;

    const response = await fetch(url, {
      headers: { "x-api-key": API_KEY },
    });

    if (!response.ok) {
      throw new Error("Error loading user");
    }

    const json: ApiResponse = await response.json();
    const userData = (json as unknown as { data: ApiUser }).data;
    if (!userData) return undefined;

    return mapApiUser(userData);
  },

  updateUser: async (id: string, data: UserFormData): Promise<User> => {
    await delay(500);

    if (shouldUseMockData()) {
      const index = usersDb.findIndex((u) => u.id === id);
      if (index === -1) {
        throw new Error("User not found");
      }

      const updatedUser: User = {
        ...usersDb[index],
        ...data,
        avatar:
          data.avatar ||
          `https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}`,
      };

      usersDb[index] = updatedUser;
      return updatedUser;
    }

    const url = new URL(`${API_URL}/${id}`);

    const response = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          role: reverseRoleMap[data.role] || "user",
          avatar:
            data.avatar ||
            `https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}`,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Error updating user");
    }

    const json = await response.json();
    return mapApiUser(json);
  },

  createUser: async (data: UserFormData): Promise<User> => {
    await delay(500);

    if (shouldUseMockData()) {
      const newId = generateUUID();

      const newUser: User = {
        id: newId,
        ...data,
        avatar:
          data.avatar ||
          `https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}`,
        createdAt: new Date().toISOString(),
      };

      usersDb.unshift(newUser);
      return newUser;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          role: reverseRoleMap[data.role] || "user",
          avatar:
            data.avatar ||
            `https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}`,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Error creating user");
    }

    const json = await response.json();
    return mapApiUser(json);
  },

  deleteUser: async (id: string): Promise<void> => {
    await delay(500);

    if (shouldUseMockData()) {
      const index = usersDb.findIndex((u) => u.id === id);
      if (index === -1) {
        throw new Error("User not found");
      }

      usersDb.splice(index, 1);
      return;
    }

    const url = new URL(`${API_URL}/${id}`);

    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: { "x-api-key": API_KEY },
    });

    if (!response.ok) {
      throw new Error("Error deleting user");
    }
  },
};
