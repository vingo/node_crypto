var crypto = require('crypto');
var key = '12345678901234567890123456789012';
var data = "13245678901";

function test() {
    var aesutil = {}; // module.exports = {};
    /**
     * aes加密
     * @param data 待加密内容
     * @param key 必须为32位私钥
     * @returns {string}
     */
    aesutil.encryption = function(data, key, iv) {
            iv = iv || "";
            var clearEncoding = 'utf8';
            var cipherEncoding = 'base64';
            var cipherChunks = [];
            var cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
            cipher.setAutoPadding(true);
            cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
            cipherChunks.push(cipher.final(cipherEncoding));
            return cipherChunks.join('');
        }
        /**
         * aes解密
         * @param data 待解密内容
         * @param key 必须为32位私钥
         * @returns {string}
         */
    aesutil.decryption = function(data, key, iv) {
        if (!data) {
            return "";
        }
        iv = iv || "";
        var clearEncoding = 'utf8';
        var cipherEncoding = 'base64';
        var cipherChunks = [];
        var decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
        decipher.setAutoPadding(true);
        data = data.replace('*', '+'); //替换+ 特殊符号，与前端加密保持一致
        cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
        cipherChunks.push(decipher.final(clearEncoding));
        return cipherChunks.join('');
    }
    var e = aesutil.encryption(data, key, '');
    var de = aesutil.decryption(e, key, '');
    var de2 = aesutil.decryption('B8yTZsiyPZdQZ+Qj1OhKQg==', key, '');
    console.log('encode: ', e);
    console.log('decode: ', de);
    console.log('decode de2: ', de2);
}

test();