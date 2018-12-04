export default class ValidatorRules
{
    requiredRule(data)
    {
        if (typeof data == "string" || typeof data == "object")
            return data.length != 0;

        return data != undefined && data != null;
    }

    typeRule(data, type)
    {
        if ((type instanceof Array) == false)
        {
            var typeName = type.name.toLowerCase();

            if (typeof data == "object")
            {
                if (data.constructor == undefined && typeof data == typeName)
                    return true;

                return data instanceof type;
            }
            return typeof data == typeName;
        }

        for (t of type)
        {
            if (this.type(data, t))
                return true;
        }

        return false;
    }

    validatorRule(data, rules)
    {
        let validator = rules.validator;

        delete rules.validator;

        return validator(data, rules);
    }
}