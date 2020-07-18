if (process.env.REACT_APP_STAGE === "development") {
  module.exports = require("./dev")
} else {
  module.exports = require("./prod")
}