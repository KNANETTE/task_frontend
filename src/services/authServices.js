export async function register(username, email, password) {
    const response = await fetch("http://localhost:1337/api/auth/local/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    })

    return response
}

export async function login(identifier, password) {
    const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            identifier,
            password
        })
    })

    return response
}

export async function isLogged(token) {
    const response = await fetch("http://localhost:1337/api/users/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response
}
