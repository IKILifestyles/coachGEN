const fs = require('fs');

function readPngRect() {
    const buf = fs.readFileSync('d:/TRUST/logo.png');
    if (buf.toString('ascii', 1, 4) === 'PNG') {
        const width = buf.readUInt32BE(16);
        const height = buf.readUInt32BE(20);
        console.log("Size:", width, "x", height);
    } else {
        console.log("Not a PNG");
    }
}
readPngRect();
