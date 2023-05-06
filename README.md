# Download and Upload Large Files with Express

This is a simple project that demonstrates how to implement file download and upload functionality in Node.js using the Express web framework. This project also supports range requests, which enables users to resume interrupted downloads.

## Setup

1. Clone the repository:

```
git clone https://github.com/melikaShojaee/express-large-file-upload-download.git
```

2. Install the dependencies:

```
npm install
```

3. Start the server:

```
npm start
```

## Usage

### Uploading a File

To upload a file, send a POST request to the `/upload` endpoint with the `file` field set to the file you want to upload. The server will respond with a 200 OK status code and a JSON object containing a message indicating that the file was uploaded successfully.

Example:

```
curl -X POST -F "file=@/path/to/your/file" http://localhost:3000/upload
```

### Downloading a File

To download a file, send a GET request to the `/download/:id` endpoint with the file ID in the URL. The server will respond with the file as an octet stream, along with the necessary headers to support range requests.

Example:

```
curl -o output-file.mim -L -C - http://localhost:3000/download/your-file-id
```

### Limiting the File Size

The maximum file size can be limited by setting the `limits` option on the `multer` middleware.

Example:

```javascript
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 1024 * 10 } // limit to 10 GB
});
```

### Handling Range Requests

This project supports range requests, which enables users to resume interrupted downloads. When a range request is received, the server responds with the requested chunk of the file and the necessary headers to support resumption of the download.
