const d = 'dakgaeogwhkvamfdbwrkgsdfherbqFEAFOF34#$#@$RQEKFGOGFdDADGFQFFFGCodIT'

export class secureStorage {
    constructor() {}

    static setItem = async (key: string, value: string): Promise<void> => {
        const EncryptStorage = (await import("encrypt-storage")).default
        return await EncryptStorage(d).setItem(key, value)
    }

    static getItem = async  (key: string): Promise<any> => {
        const EncryptStorage = (await import("encrypt-storage")).default
        return EncryptStorage(d).getItem(key)
    }

    static removeItem = async  (key: string): Promise<void> => {
        const EncryptStorage = (await import("encrypt-storage")).default
        return EncryptStorage(d).removeItem(key)
    }
}
