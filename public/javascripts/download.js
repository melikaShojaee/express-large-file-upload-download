const video = document.querySelector("#video");
const downloadForm = document.querySelector("#download-form");
let downloadedBytes = 0;

function handleDownloadResponse(xhr) {
    if (xhr.status === 206) {
        const blob = xhr.response;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "video.mp4";
        link.click();
        downloadedBytes += blob.size;
    }
}

function downloadFile() {
    const headers = new Headers();
    const range = `bytes=${downloadedBytes}-`;
    headers.append("Range", range);
    const url = `http://localhost:3000/download/${downloadForm.elements.id.value}`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = () => handleDownloadResponse(xhr);
    xhr.send();

    video.src = url;
}

downloadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    downloadFile();
});