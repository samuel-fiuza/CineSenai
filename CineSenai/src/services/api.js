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

    salas: {
        listar: () => request("/api/salas"),
        buscarPorId: (id) => request(`/api/salas/${id}`),
        criar: (salas) => request("/api/salas", {
            method: "POST",
            body: JSON.stringify(salas)
        }),

        deletar: (id) => request(`/api/salas/${id}`, {
            method: "DELETE"
        }),
    },

    sessoes: {
        listarPorData: (data) => request(`/api/sessoes?data=${data}`),
        listarPorFilme: (filmeId) => request(`/api.sessoes?filmeId=${filmeId}`),
        buscarPorId: (id) => request(`/api/sessoes/${id}`),
        listarPorAssentos: (id) => request(`/api/sessoes/${id}/assentos`),
        criar: (sessao) => request(`/api/sessoes`, {
            method: "POST",
            body: JSON.stringify(sessao)
        }),
        deletar: (id) => request(`api/sessoes/${id}`, {
            method: "DELETE"
        }),
    },

    reserva: {
        criar: (sessaoId, assentosIds ) => request(`/api/reservas`, {
            method: "POST",
            body: JSON.stringify({sessaoId, assentosIds}),
        }),
        listarMinhas: () => request(`/api/reservas/minhas`),
        cancelar: (id) => request(`/api/reservas/${id}`, {
            method: "DELETE"
        })
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

    usario: {
        buscarPerfil: () => request(`api/usuario/perfil`),
        atualizarPErfil: (nome, email) => request(`/api/usuario/perfil`, {
            method: "PUT",
            body: JSON.stringify({nome, email})
        }),
        trocarSenha: (senhaAtual, novaSenha) => request(`/api.usuarios.senha`, {
            method: "PATCH",
            body: JSON.stringify({senhaAtual, novaSenha}),
        }),

        excluirConta: () => request(`/aapi/usuario/perfil`, {
            method: "DELETE"
        })
    }

};