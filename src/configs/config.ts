import { Environment } from "./environment";

class Configuration {

    public host: string;

    public hashSecret: string;

    constructor(host: string, hashSecret: string) {
        this.host = host;
        this.hashSecret = hashSecret;
    }
}

let devConfig: Configuration = new Configuration(
    "http://localhost:8000",
    "kkilJnf54Ikl"
);

let productionConfig: Configuration = new Configuration(
    "http://production",
    "oLk5214p6Ps"
);

let config = process.env.NODE_ENV == Environment.Production ?
    productionConfig : devConfig;

export = config;