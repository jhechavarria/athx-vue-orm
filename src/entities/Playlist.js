import Entity from '../core/Entity';
import Track from './Track'

export default class Playlist extends Entity
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

        this.foreign_keys = {
            tracks: Track
        };

        if (data)
            this.hydrate(data);
    }
}