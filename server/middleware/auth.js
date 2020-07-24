const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const { jwksUri, audience, issuer } = require("../config/key");

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: jwksUri,
  }),
  audience: audience,
  issuer: issuer,
  algorithms: ["RS256"],
});

module.exports = {
  jwtCheck,
};
