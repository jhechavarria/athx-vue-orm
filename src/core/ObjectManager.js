import Storage from './Storage'
import Validator from './Validator'

export default class ObjectManager extends Validator
{
    constructor()
    {
        super();

        this.storage = new Storage();
    }

    save()
    {
        let identifier = this.getIdentifier();
        let data = this.toObject();
        let table = this.storage.get(this.table_name);

        if (!table)
            table = {};

        table[identifier] = data;

        this.storage.set(this.table_name, table);
    }

    remove()
    {
        let identifier = this.getIdentifier();
        let table = this.storage.get(this.table_name);

        if (!table || table[identifier] == undefined)
            return true;

        delete table[identifier];

        this.storage.set(this.table_name, table);
    }

    isLinkable(entity)
    {
        for (var property in this.foreign_keys)
        {
            let type = this.foreign_keys[property].name;
            if (entity.constructor.name == type)
                return true;
        }
        return false;
    }

    link(entity)
    {
        for (var property in this.foreign_keys)
        {
            let type = this.foreign_keys[property].name;
            if (entity.constructor.name == type)
            {
                let identifier = entity.getIdentifier();
                if (this[property] && this[property][identifier])
                    return true;

                if (this[property] == undefined)
                    this[property] = {};

                this[property][identifier] = entity;

                entity.save();
                this.save();

                return true;
            }
        }
        return false;
    }

    unlink(entity)
    {
        for (var property in this.foreign_keys)
        {
            let type = this.foreign_keys[property].name;
            if (entity.constructor.name == type)
            {
                let identifier = entity.getIdentifier();
                if (!this[property][identifier])
                    return true;

                delete this[property][identifier];

                this.save();

                return true;
            }
        }
        return true;
    }
}