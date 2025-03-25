const http = require('http');
const formidable = require('formidable');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/fileupload' && req.method.toLowerCase() === 'post') {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error parsing the file upload');
                return;
            }

            const file = files.filetoupload[0];
            const oldPath = file.filepath;
            const newPath = `C:/Users/Suresh/${file.originalFilename}`; // Change this to your desired path

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error moving the file');
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File uploaded and moved successfully!');
            });
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
            <form action="/fileupload" method="post" enctype="multipart/form-data">
                <input type="file" name="filetoupload"><br>
                <input type="submit" value="Upload File">
            </form>
        `);
        res.end();
    }
});

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});