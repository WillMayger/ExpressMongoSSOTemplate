// CONFIG FILE FOR DEFINING STRINGS USED IN APPLICATION

const NETWORK_SETTINGS = {
    URI: 'http://127.0.0.1',
    PORT: 3001,
    CLIENT_PORT: 3000,
};

const GOOGLE_SSO = {
    clientID: '', // YOU WILL NEED TO CREATE THIS THROUGH GOOGLE
    clientSecret: '', // YOU WILL NEED TO CREATE THIS THROUGH GOOGLE
    callbackURL: `${NETWORK_SETTINGS.URI}:${NETWORK_SETTINGS.PORT}/api/auth/google/callback`,
};

const DATABASE = {
    CONNECTION_STRINGS: {
        prod: 'mongodb://MONGO_DB_CONNECTION_STRING/DATABASE_NAME',
        test: 'mongodb://TEST_MONGO_DB_CONNECTION_STRING/TEST_DATABASE_NAME',
    },
};

const config = {
    NETWORK_SETTINGS,
    GOOGLE_SSO,
    DATABASE,
};

module.exports = config;
