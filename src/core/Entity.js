import ObjectManager from './ObjectManager'
import Repository from './Repository';

export default class Entity extends ObjectManager
{
    constructor()
    {
        super();

        this.unique_identifier = "id";
        this.table_name = this.constructor.name;
        this.table_schema = {
            id: {
                type: Number,
                required: true,
                validator: (value) => {
                    return Number.isInteger(value) && value;
                }
            }
        };
    }

    getIdentifier()
    {
        return this[this.unique_identifier];
    }

    hydrate(data)
    {
        for (let property in this.table_schema)
        {
            if (data[property])
                this[property] = data[property];
            else if (this.table_schema[property].nullable)
                this[property] = null;
        }

        for (let property in this.foreign_keys)
        {
            if (!data[property])
                continue;

            let repo = new Repository(this.foreign_keys[property]);
            this[property] = repo.list(data[property]);
        }
    }

    toObject()
    {
        let obj = {};

        for (let property in this.table_schema)
        {
            if (this[property])
                obj[property] = this[property];
            else if (this.table_schema[property].nullable)
                obj[property] = null;
        }

        for (let property in this.foreign_keys)
        {
            if (!this[property])
                continue;

            obj[property] = [];

            for (let identifier in this[property])
            {
                let id = this[property][identifier].getIdentifier();
                obj[property].push(id);
            }
        }

        return obj;
    }
}