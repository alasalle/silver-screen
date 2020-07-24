module.exports = {
  mongoURI: process.env.MONGO_URI,
  secret: process.env.SECRET,
  port: process.env.PORT,
  authClientID: process.env.CLIENT_ID,
  authClientSecret: process.env.CLIENT_SECRET,
  authDomain: process.env.DOMAIN,
  jwksUri: process.env.JWKS_URI,
  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
};
