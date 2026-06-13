const BASE_URL = "";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token")

    return token
    ? {"Authorization": `Bearer ${token}`}
    : {};
}

const request = async (url, options = {}) => {
    const headers = {
        "Content-Type": "application/json", 
        ...getAuthHeaders(), 
        ...options.headers, 
    };

    const response = await fetch (
        url,
        {...options,
        headers,}
    )

    if (response.status === 204) {
        return null
    }

    if (response.status === 401 || response.status === 403) {
        
    
        if (localStorage.getItem("token")) {

            localStorage.removeItem("token")

            localStorage.removeItem("user")

            window.dispatchEvent(
                new Event("auth-change")
            );
        }
    }

    if (!response.ok) {
        const errorData = await response.json()
        .catch(() => ({}))

        throw new Error(
            errorData.message || `Error na requisição (Status: ${response.status})`
        );
    }

    return response.json();
};

export const api = {
    auth: {
        login: (email, senha) => 
            request("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, senha }),
            }),
        
        cadastro: (nome, email, senha) =>
            request("/api/auth/cadastro", {
                method: "POST",
                body: JSON.stringify({ nome, email, senha }),
            }),
    },

    filme: {
        listar: () => request("/api/filmes"),
        buscarPorId: (id) => request (`/api/filmes/${id}`),
        criar: (filme) => request("/api/filmes", {
            method: "POST",
            body: JSON.stringify(filme)
        }),

        atualizar: (filme, id) => request(`/api/filmes/${id}`, {
            method: "PUT",
            body: JSON.stringify(filme)
        }),

        deletar: (id) => request(`api/filmes/${id}`, {
            method: "DELETE",
        }),
    },

    avaliacoes: {
        listar: (filmeId) => request(`/api/filmes/${filmeId}/avlaiacoes`),
        criar: (filmeId, avaliacao) => request(`/api/filmes/${filmeId}/avaliacoes`, {
            method: "POST",
            body: JSON.stringify(avaliacao),
        }),
    },

    admin: {
        listarReservas: () => request(`/api/admin/reservas`),
        gerarRelatorio: () => request("/api/admin/relatorios"),
        promoverUsuario: (id) => request(`/api/admin/usarios/${id}/promover`, {
            method: "PATCH",
        }),
    },

    favoritos: {
        listar: () => request(`/api/favoritos`),
        adicionar: (filmeId) => request(`/api/favoritos`, {
            method: "POST",
            body: JSON.stringify({filmeId})
        }),
        remover: (filmeId) => request(`/api/favoritos/${filmeId}`, {
            method: "DELETE",
        }),
        verificar: (filmeId) => request(`api/favoritos/verificar?filmeId=${filmeId}`),
    },
};