export function extract(data) {
    const date = new Date(data)
    const hours = padzero(date.getHours())
    const minutes = padzero(date.getMinutes())
    return `${hours}:${minutes}`
}

function padzero(value) {
    return value.toString().padStart(2,"0")
}