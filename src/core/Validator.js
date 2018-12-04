import ValidatorRules from './ValidatorRules'

export default class Validator extends ValidatorRules
{
    validate()
    {
        this.clearErrors();

        for (var property in this.table_schema)
        {
            var data = this[property];
            var rules = this.table_schema[property];

            if (!this.required(data) && rules.default)
            {
                if (typeof rules.default == "function")
                    data = rules.default();
                else
                    data = rules.default;
            }

            if (rules.required && !this.required(data, rules.required))
                this.setError(property, "required");

            if (rules.type && !this.type(data, rules.type))
                this.setError(property, "type");

            if (rules.validator && !this.validator(data, rules.validator))
                this.setError(property, "validator");
        }

        for (let key in this.validation_errors)
            return false;
        return true;
    }

    getErrors()
    {
        return this.validation_errors;
    }

    clearErrors()
    {
        this.validation_errors = {};
    }

    setError(property, error)
    {
        if (!this.validation_errors[property])
            this.validation_errors[property] = [];

        if (this.validation_errors[property].indexOf(error) == -1)
            this.validation_errors[property].push(error);
    }

    prepRule(property, rules)
    {
        if (typeof property == "number")
            return {
                property: rules,
                required: false
            };

        if (rules instanceof Array || !rules instanceof Object )
            return {
                property: property,
                type: rules,
                required: false
            };

        rules.property = property;
        return rules;
    }
}