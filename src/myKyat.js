import CryptoJS from 'crypto-js'

class OnlinePurchaseAes {
    constructor() {
        this._keySize = 128
        this._ivSize = 128
        this._iterationCount = 1989
    }

    generateKey(salt, secret_key) {
        return CryptoJS.PBKDF2(secret_key, CryptoJS.enc.Hex.parse(salt), {
            keySize: this._keySize / 32,
            iterations: this._iterationCount
        })
    }

    encryptWithIvSalt(salt, iv, secret_key, plainText) {
        let key = this.generateKey(salt, secret_key)
        let encrypted = CryptoJS.AES.encrypt(plainText, key, {iv: CryptoJS.enc.Hex.parse(iv)})
        return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
    }

    decryptWithIvSalt(salt, iv, secret_key, cipherText) {
        let key = this.generateKey(salt, secret_key)
        let cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(cipherText)
        })
        let decrypted = CryptoJS.AES.decrypt(cipherParams, key, {iv: CryptoJS.enc.Hex.parse(iv)});
        return decrypted.toString(CryptoJS.enc.Utf8)
    }

    encrypt(secret_key, plainText) {
        let iv = CryptoJS.lib.WordArray.random(this._ivSize / 8).toString(CryptoJS.enc.Hex)
        let salt = CryptoJS.lib.WordArray.random(this._keySize / 8).toString(CryptoJS.enc.Hex)
        let cipherText = this.encryptWithIvSalt(salt, iv, secret_key, plainText)
        return salt + iv + cipherText
    }

    decrypt(secret_key, cipherText) {
        let ivLength = this._ivSize / 4
        let saltLength = this._keySize / 4
        let salt = cipherText.substr(0, saltLength)
        let iv = cipherText.substr(saltLength, ivLength)
        let encrypted = cipherText.substring(ivLength + saltLength)
        let decrypted = this.decryptWithIvSalt(salt, iv, secret_key, encrypted)
        return decrypted
    }

    get keySize() {
        return this._keySize
    }

    set keySize(value) {
        this._keySize = value
    }

    get iterationCount() {
        return this._iterationCount
    }

    set iterationCount(value) {
        this._iterationCount = value
    }
}

export const PROVIDER_ID = 'myKyat'

export const SECRET_KEY = '$2a$10$nCKbgBA/D/47LaBiwamLreptl7DmVjFDuMh9nTxU1KUkDv7MMx4pi'

export const MERCHANT_ID = '578584563'

export const PRE_AUTH = 'http://service.mykyat.com/MobiliserHubPrd/rest/onlineShopPurchasePreauthorisation/'

export const PURCHASE_NEXT = 'http://service.mykyat.com/MobiliserHubPrd/rest/onlineShopPurchaseContinue/'

export default OnlinePurchaseAes