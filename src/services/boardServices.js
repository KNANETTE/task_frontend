export async function getBoards(token, workspaceID = null) {
    const response = await fetch(`http://localhost:1337/api/workspaces/${workspaceID}?populate=boards`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    return response
}
export async function getBoard(token, id) {
    const response = await fetch(`http://localhost:1337/api/boards/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    return response
}
export async function createBoard(token, data) {
    const response = await fetch(`http://localhost:1337/api/boards`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json',
        },
        body: data,
    })

    return response
}
export async function updateBoard(token, id, data) {
    const response = await fetch(`http://localhost:1337/api/boards/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json',
        },
        body: data,
    })

    return response
}
export async function deleteBoard(token, id) {
    const response = await fetch(`http://localhost:1337/api/boards/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    return response
}