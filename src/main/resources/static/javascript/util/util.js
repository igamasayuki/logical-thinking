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
    constructor (value, elementName, length, selected) {
        this.errorElement = {
            elementName: elementName,
            value: value,
            message: '',
            validatedError: false,
            length: length,
            selected: selected,
        }
    };

    validation () {
        const regExpEmpty = "^[ ]*$";
        const value = this.errorElement.value;
        this.errorElement.validatedError = false;
        if ((value.match(regExpEmpty) || value.length > 100) && !this.errorElement.selected) {
            this.errorElement.validatedError = true;
            //lengthがtrueなら文字列の長さのエラー文を挿入　falseなら未入力用を挿入
            this.errorElement.message = this.errorElement.length
                ? new MessageUtil(this.errorElement.elementName).lengthErrorMessage
                : new MessageUtil(this.errorElement.elementName).emptyErrorMessage;
        };
        if (this.errorElement.selected && this.errorElement.value == 0) {
            this.errorElement.validatedError = true;
            this.errorElement.message = new MessageUtil(this.errorElement.elementName).selectedErrorMessage;
        }
    };
};

class MessageUtil {
    constructor(elementName) {
        this.lengthErrorMessage = $(`<div id="${elementName}_error" class="text-danger">100文字以内で入力してください</div>`);
        this.emptyErrorMessage = $(`<div id="${elementName}_error" class="text-danger">入力してください</div>`)
        this.selectedErrorMessage = $(`<div id="${elementName}_error" class="text-danger">選択してください</div>`);
    };
};