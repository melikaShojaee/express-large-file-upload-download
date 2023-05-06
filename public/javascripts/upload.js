const uploadForm = document.querySelector("#upload-form");
const uploadProgress = document.querySelector("#upload-progress");

function handleUploadProgress(e) {
    if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        uploadProgress.value = percentComplete;
    }
}

function uploadFile() {
    const xhr = new XMLHttpRequest();
    const formData = new FormData(uploadForm);

    xhr.upload.addEventListener("progress", handleUploadProgress);

    xhr.open("POST", "http://localhost:3000/upload");
    xhr.send(formData);
}

uploadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    uploadFile();
});
