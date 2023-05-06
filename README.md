# Express Large File Upload/Download

This is an example project that demonstrates how to upload and download large files using Express, as well as how to handle range requests for resuming downloads. The project uses the `multer` middleware for handling file uploads, and the `fs` module for reading and writing files. The code supports files up to 10 GB in size.

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/melikaShojaee/express-large-file-upload-download.git
   ```

2. Install dependencies:

   ```
   cd express-large-file-upload-download
   npm install
   ```

3. Start the server:

   ```
   npm start
   ```

4. Open your web browser and navigate to [http://localhost:3000].

## Usage

### Uploading a File

To upload a file, send a POST request to the `/upload` endpoint with the file attached as a multipart/form-data payload. The `file` field should contain the file to be uploaded. For example, using the `curl` command:

```
curl -X POST -F file=@path/to/file.ext http://localhost:3000/upload
```

If the upload is successful, the server will respond with a status code of 200 and a JSON object containing a success message:

```
{
  "message": "File filename.ext uploaded successfully"
}
```

If there was an error with the upload, the server will respond with a status code of 400 and a JSON object containing an error message:

```
{
  "message": "No file uploaded"
}
```

### Downloading a File

To download a file, send a GET request to the `/download/:id` endpoint, where `id` is the name of the file you wish to download. For example:

```
http://localhost:4000/download/filename.ext
```

If the file exists, the server will respond with a status code of 200 and send the file as an octet-stream attachment. If the file does not exist, the server will respond with a status code of 404.

The code also supports range requests for resuming downloads. If the client sends a `Range` header with the request, the server will respond with a partial content (206) status code and the appropriate `Content-Range` header. For example:

```
Range: bytes=0-1023
```

This will request the first 1024 bytes of the file. The server will respond with a `Content-Range` header like this:

```
Content-Range: bytes 0-1023/10000
```

And will send the requested bytes in the response body.

## Configuration

The following configuration options are available:

| Option | Default | Description |
| ------ | ------- | ----------- |
| `PORT` | `3000` | The port to run the server on |
| `FILE_UPLOAD_PATH` | `./public/assets/uploads` | The directory to store uploaded files in |

To override a configuration option, set the corresponding environment variable before starting the server.
