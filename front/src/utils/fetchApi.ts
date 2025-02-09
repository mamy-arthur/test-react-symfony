const baseURL: String = import.meta.env.VITE_APP_URL || 'localhost';
type loginPayload = {
    email: String;
    password: String;
}

export async function fetchApiConnect(data: loginPayload) {
    const response = await fetch(`${baseURL}/api/login`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    if (response.status === 401) {
        return null;
    }
    return response.json();
}

export async function fetchApiWithToken(token: string | null | undefined, endpoint: string, method: string = 'GET', data: any = {}) {
    let options: any = {
        method: method,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    if (method !== 'GET') {
        options = {
            ...options,
            body: JSON.stringify(data)
        }
    }
    const response = await fetch(`${baseURL}${endpoint}`, options);
    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return response.json();
}