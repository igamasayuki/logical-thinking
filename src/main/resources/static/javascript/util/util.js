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
    }
}