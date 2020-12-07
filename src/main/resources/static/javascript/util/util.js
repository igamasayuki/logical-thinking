export class Url {
    constructor () {
        this.url = location.href;
        this.path = location.pathname;
        this.uri = this.url.replace(this.path, "");
    }
}

export class PyramidUrl {
    constructor () {
        this.apiFrameworkUrl = '/api/framework/get';
        this.getOldPyramidUrl = '/api/pyramid/get';
    }
}

export class Error {
    constructor (value, elementName, length) {
        this.errorElement = {
            elementName: elementName,
            value: value,
            message: '',
            validatedError: false,
            length: length,
        }
    };

    validation () {
        const regExpEmpty = "^[ ]*$";
        const value = this.errorElement.value;
        this.errorElement.validatedError = false;
        if (value.match(regExpEmpty) || value == '' || value.length > 100) {
            this.errorElement.validatedError = true;
            this.errorElement.message = this.errorElement.length 
                ? new MessageUtil(this.errorElement.elementName).lengthErrorMessage
                : new MessageUtil(this.errorElement.elementName).emptyErrorMessage;
        };
    };
};

class MessageUtil {
    constructor(elementName) {
        this.lengthErrorMessage = $(`<div id="${elementName}_error" class="text-danger">100文字以内で入力してください</div>`);
        this.emptyErrorMessage = $(`<div id="${elementName}_error" class="text-danger">入力してください</div>`)
    };
};