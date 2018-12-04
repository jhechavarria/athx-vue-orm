import Storage from './Storage'

export default class Repository
{
    constructor(object)
    {
        this.storage = new Storage();

        if (typeof object == "function")
        {
            this.entity = object;
            this.table_name = object.name;
        }
        else if (object instanceof Object)
        {
            this.entity = object.constructor;
            this.table_name = object.constructor.name;
        }
    }

    getRawData()
    {
        let data = this.storage.get(this.table_name);

        if (data == null)
            return false;

        return data;
    }

    read(identifier)
    {
        let data = this.getRawData();

        if (!data || data[identifier] == undefined)
            return false;

        return this.buildEntity(data[identifier]);
    }

    list(identifiers=null)
    {
        let data = this.getRawData();
        let entity = new this.entity();
        let identifier = entity.unique_identifier;

        if (!data)
            return {};

        for (let key in data)
        {
            let id = data[key][identifier];
            if (identifiers != null && !identifiers.includes(id))
            {
                delete data[key];
                continue;
            }

            data[key] = this.buildEntity(data[key]);
        }

        return data;
    }

    find(where)
    {
        let data = this.getRawData();

        if (!data)
            return {};

        let found = {};

        for (key in data)
        {
            let item = data[key];
            let corresponds = true;
            for (property in where)
            {
                if (item[property] != where[property])
                {
                    corresponds = false;
                    break;
                }
            }
            if (corresponds)
                found[key] = this.buildEntity(item);
        }

        return found;
    }

    buildEntity(data)
    {
        let entity = new this.entity();

        entity.hydrate(data);

        return entity;
    }
}