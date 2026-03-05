export async function getCards(token, listID = null) {
    const response = await fetch(`http://localhost:1337/api/lists/${listID}?populate=cards`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    return response
}
export async function getCard(token, id) {
    const response = await fetch(`http://localhost:1337/api/cards/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    return response
}
export async function createCard(token, data) {
    const response = await fetch(`http://localhost:1337/api/cards`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json',
        },
        body: data,
    })

    return response
}
export async function updateCard(token, id, data) {
    const response = await fetch(`http://localhost:1337/api/cards/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json',
        },
        body: data,
    })

    return response
}
export async function deleteCard(token, id) {
    const response = await fetch(`http://localhost:1337/api/cards/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    return response
}