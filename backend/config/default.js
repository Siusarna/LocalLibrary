module.exports = {
  port: process.env.PORT || 3000,
  jwt: {
    secret: 'LocalLibrary',
    tokens: {
      access: {
        type: 'access',
        expiresIn: '30m',
      },
      refresh: {
        type: 'refresh',
        expiresIn: '40m',
      },
    },
  },
  crypto: {
    hash: {
      length: 128,
      iterations: 12000,
    },
  },
  pg: {
    client: 'pg',
    connection: {
      host: 'siusarna.c3cfzuvuit7d.eu-central-1.rds.amazonaws.com',
      user: 'postgres',
      password: 'asdfghjkl12',
      database: 'siusarna',
    },
  },
};
