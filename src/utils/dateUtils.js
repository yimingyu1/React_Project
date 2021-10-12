export function getDate(time) {
    const date = new Date(time)
    const second = date.getSeconds() < 10? "0" + date.getSeconds() : date.getSeconds()
    const minute = date.getMinutes() < 10? "0" + date.getMinutes() : date.getMinutes()
    return date.getFullYear() + "-" + ( date.getMonth() + 1 ) + '-' + date.getDate() + " " + date.getHours() + ":" + minute + ":" + second
}