import { User, UserFormData } from "../types/user";
import { removeAccents } from "../utils";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface FetchUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
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

export const api = {
  getUsers: async (
    params: FetchUsersParams = {},
  ): Promise<PaginatedResponse<User>> => {
    await delay(300);

    // Obtener todos los datos para filtrar localmente
    const url = new URL(API_URL);
    url.searchParams.set("page", "1");
    url.searchParams.set("limit", "100"); // Obtener suficientes datos

    const response = await fetch(url.toString(), {
      headers: { "x-api-key": API_KEY },
    });

    if (!response.ok) {
      throw new Error("Error al cargar usuarios");
    }

    const json: ApiResponse = await response.json();
    let users = json.data.map(mapApiUser);

    // Aplicar filtros localmente
    if (params.search) {
      const searchNormalized = removeAccents(params.search.toLowerCase());
      users = users.filter((u) => {
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
      users = users.filter((u) => u.role === params.role);
    }

    // Paginación local
    const page = params.page || 1;
    const limit = params.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = users.slice(start, end);

    return {
      data: paginatedData,
      total: users.length,
      page,
      totalPages: Math.ceil(users.length / limit),
    };
  },

  getUserById: async (id: string): Promise<User | undefined> => {
    await delay(300);

    const url = `${API_URL}/${id}`;

    const response = await fetch(url, {
      headers: { "x-api-key": API_KEY },
    });

    if (!response.ok) {
      throw new Error("Error al cargar usuario");
    }

    const json: ApiResponse = await response.json();
    const userData = (json as unknown as { data: ApiUser }).data;
    if (!userData) return undefined;

    return mapApiUser(userData);
  },

  updateUser: async (id: string, data: UserFormData): Promise<User> => {
    await delay(500);

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
      throw new Error("Error al actualizar usuario");
    }

    const json = await response.json();
    return mapApiUser(json);
  },

  createUser: async (data: UserFormData): Promise<User> => {
    await delay(500);

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
      throw new Error("Error al crear usuario");
    }

    const json = await response.json();
    return mapApiUser(json);
  },

  deleteUser: async (id: string): Promise<void> => {
    await delay(500);

    const url = new URL(`${API_URL}/${id}`);

    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: { "x-api-key": API_KEY },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar usuario");
    }
  },
};
