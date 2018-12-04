import Entity from '../core/Entity';

export default class Track extends Entity
{
    constructor(data=null)
    {
        super();

        this.table_schema['title'] = {
            type: String,
            required: true,
            validator: (value) => {
                return typeof value == "string" && value.length;
            }
        }

        if (data)
            this.hydrate(data);
    }
}