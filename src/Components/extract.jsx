export function extract(data) {
    const date = new Date(data)
    const hour = padzero(date.getHours())
    const minutes = padzero(date.getMinutes())
    return `${hour}:${minutes}`
}

function padzero(value) {
    return value.toString().padStart(2,"0")
}