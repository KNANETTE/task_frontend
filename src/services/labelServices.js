export async function getLabels(token) {
    const response = await fetch(`http://localhost:1337/api/labels`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    return response
}
export async function getLabel(token, id) {
    const response = await fetch(`http://localhost:1337/api/labels/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    return response
}
export async function createLabel(token, data) {
    const response = await fetch(`http://localhost:1337/api/labels`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json',
        },
        body: data,
    })

    return response
}
export async function updateLabel(token, id, data) {
    const response = await fetch(`http://localhost:1337/api/labels/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json',
        },
        body: data,
    })

    return response
}
export async function deleteLabel(token, id) {
    const response = await fetch(`http://localhost:1337/api/labels/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    return response
}