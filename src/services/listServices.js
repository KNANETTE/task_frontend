export async function getLists(token, boardID = null) {
    const response = await fetch(`http://localhost:1337/api/boards/${boardID}?populate=lists`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    return response
}
export async function getList(token, id) {
    const response = await fetch(`http://localhost:1337/api/lists/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    return response
}
export async function createList(token, data) {
    const response = await fetch(`http://localhost:1337/api/lists`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json',
        },
        body: data,
    })

    return response
}
export async function updateList(token, id, data) {
    const response = await fetch(`http://localhost:1337/api/lists/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json',
        },
        body: data,
    })

    return response
}
export async function deleteList(token, id) {
    const response = await fetch(`http://localhost:1337/api/lists/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    return response
}