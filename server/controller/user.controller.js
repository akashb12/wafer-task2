const config = require("../config/key");
const { User } = require("../model/User");
let APIKEY = config.twoFactor || "";
if (APIKEY === "") {
  throw new Error("Missing 2Factor api key in environment");
}
const TwoFactor = new (require("2factor"))(APIKEY);

// register user
module.exports.registerUser = function (req, res) {
  const { email, password, phone } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err)
      return res.status(400).send({
        status: false,
        error: err,
      });
    else if (user) {
      return res.status(200).send({
        status: false,
        error: "user already exist",
      });
    } else {
      const user = new User({ email, phone, password });
      user.save((err, doc) => {
        if (err) {
          console.log("error", err);
          return res.json({ status: false, err });
        } else {
          return res.status(200).json({
            status: true,
            user: doc,
          });
        }
      });
    }
  });
};

// login user

module.exports.loginUser = async function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email: email, password: password }, function (err, user) {
    if (err)
      return res.status(400).send({
        status: false,
        error: err,
      });
    else if (user) {
      TwoFactor.sendOTP(user.phone, { template: "wafer-test-sms" }).then(
        (sessionId) => {
          return res.status(200).send({
            status: true,
            sessionId: sessionId,
            id: user._id,
          });
        },
        (error) => {
          console.log("error", error);
          return res.status(400).send({
            status: false,
            error: error,
          });
        }
      );
    } else {
      return res.status(200).send({
        status: false,
        message: "email or password entered is not valid",
      });
    }
  });
};

// verification
module.exports.verification = function (req, res) {
  console.log(req.body);
  const { sessionId, otp } = req.body;
  TwoFactor.verifyOTP(sessionId, otp).then(
    (response) => {
      console.log(response);
      if (response === "OTP Expired") {
        return res.status(400).send({
          status: false,
          response: response,
        });
      } else {
        return res.status(200).send({
          status: true,
          response: response,
        });
      }
    },
    (error) => {
      return res.status(400).send({
        status: false,
        message: "sessionid or otp is invalid",
        error: error,
      });
    }
  );
};
