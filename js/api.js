let usuariosCache = null;

export async function obtenerUsuarios(reload = false) {
    const URL = 'https://jsonplaceholder.typicode.com/users';
    if (usuariosCache && !reload) {
        return usuariosCache;
    }

    try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error('Error en la respuesta');
        const data = await res.json();
        usuariosCache = data;
        return data;
    } catch (e) {
        console.error('Error de red:', e.message);
        return null;
    }
}