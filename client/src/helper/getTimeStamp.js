export default function getTimeStamp () {
    return new Date().toLocaleTimeString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "numeric",
    }).toLowerCase()
}