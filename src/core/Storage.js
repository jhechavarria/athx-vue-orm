export default class Storage
{
    constructor(storageType="local")
    {
        this.storage = window[storageType + "Storage"];
    }

    get(key)
    {
        let data = this.storage.getItem(key);

        if (data == null)
            return false;

        return JSON.parse(data);
    }

    set(key, value)
    {
        if (!key || !value)
            return false;

        value = JSON.stringify(value);

        this.storage.setItem(key, value);
    }

    remove(key)
    {
        this.storage.removeItem(key);
    }

    clear()
    {
        this.storage.clear();
    }
}