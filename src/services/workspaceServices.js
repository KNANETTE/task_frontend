export async function getWorkspaces(token) {
    const response = await fetch(`http://localhost:1337/api/users/me?populate[workspaces][sort]=updatedAt:desc`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })

    return response
}

export async function getWorkspace(token, id) {
    const response = await fetch(`http://localhost:1337/api/workspaces/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response
}

export async function createWorkspace(token, data) {
    const response = await fetch(`http://localhost:1337/api/workspaces`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: data,
    })

    return response
}

export async function updateWorkspace(token, id, data) {
    const response = await fetch(`http://localhost:1337/api/workspaces/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: data,
    })

    return response
}

export async function deleteWorkspace(token, id) {
    const response = await fetch(`http://localhost:1337/api/workspaces/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    return response
}