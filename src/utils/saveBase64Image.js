const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function saveBase64Image(base64Content, mimeType) {
    const ext = mimeType.split('/')[1]; // exemplo: "image/png" → "png"
    const filename = `${crypto.randomUUID()}.${ext}`;
    const filePath = path.join(__dirname, '..', '..', 'public', 'media', filename);

    const base64Data = base64Content.replace(/^data:[\w\/]+;base64,/, '');

    fs.writeFileSync(filePath, base64Data, 'base64');

    // O que será salvo no banco
    return `/media/${filename}`;
}

module.exports = saveBase64Image;
