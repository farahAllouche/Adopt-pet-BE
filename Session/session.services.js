const {
  getUser,
  register,
  login,
  logout,
  getUserInfo,
  updateUserInfo,
  intrestedIn,
} = require("./session.controller");
const bcrypt = require("bcrypt");

function loginHandler(req, res) {
  const { email, password } = req.body;

  getUser(email)
    .then((user) => {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send({ message: "Invalid email or password" });
      }
      const { accessToken, refreshToken } = login({
        name: user.name,
        userId: user.id,
      });
      //console.log("accessToken", accessToken);

      res.cookie("accessToken", accessToken, {
        maxAge: 3.154e10, // 2 hours
        httpOnly: true,
        secure: true, // Ensures the cookie is sent over HTTPS
        sameSite: "None",
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        secure: true, // Ensures the cookie is sent over HTTPS
        sameSite: "None",
      });

      res.send({ name: user.name, userId: user.id, photo: user.photo });
    })
    .catch((err) => {
      res.status(401).send({ message: "Login failed" });
    });
}
function registerHandler(req, res) {
  const { name, email, password, role } = req.body;
  const userDetails = {
    email,
    password,
    name,
    role,
  };

  register(userDetails)
    .then(({ accessToken, refreshToken, userId }) => {
      res.cookie("accessToken", accessToken, {
        maxAge: 3.154e10,
        httpOnly: true,
        secure: true, // Ensures the cookie is sent over HTTPS
        sameSite: "None",
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        secure: true, // Ensures the cookie is sent over HTTPS
        sameSite: "None",
      });

      res.send({ name: name, userId: userId });
    })
    .catch((err) => {
      console.log(err);
      err.keyPattern
        ? res.status(409).send({ message: "User already exixts ! " })
        : res.status(400).send({ message: "Registration failed ! " });
    });
}

function logoutHandler(req, res) {
  const { accessToken, refreshToken } = req.cookies;
  //console.log(accessToken, refreshToken);
  logout(refreshToken)
    .then(() => {
      res.cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true, // Ensures the cookie is sent over HTTPS
        sameSite: "None",
      });

      res.cookie("refreshToken", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true, // Ensures the cookie is sent over HTTPS
        sameSite: "None",
      });
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(401).send({ message: "Logout failed" });
    });
}
function getSessionHandler(req, res) {
  //console.log("seesion", req.user);
  return res.send({ ...req.user });
}

function getUserInfoHandler(req, res) {
  //console.log("userhandler");
  const { userId } = req.user;
  //console.log(userId);
  getUserInfo(userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send({ message: "loading data failed" });
    });
}

function getUserHandler(req, res) {
  const { userId } = req.body;
  //console.log(userId);
  getUserInfo(userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send({ message: "loading data failed" });
    });
}

function updateUserInerest(req, res) {
  const { userId } = req.user;
  const { fav } = req.body;
  //console.log("userId", userId);
  intrestedIn(userId, fav)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send({ message: "updating data failed" });
    });
}

function updateInfoUserHandler(req, res) {
  const userDetails = req.body;

  if (userDetails.currentPwd) {
    const hashPassword = bcrypt.hashSync(userDetails.password, 10);
    userDetails.password = hashPassword;

    getUserInfo(req.user.userId).then((user) => {
      if (!bcrypt.compareSync(userDetails.currentPwd, user.password)) {
        return res.status(401).send({ message: "Invalid password" });
      }

      updateUserInfo(req.user.userId, userDetails)
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.send({ message: "Update user failed" });
        });
    });
  } else {
    updateUserInfo(req.user.userId, userDetails)
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.send({ message: "Update user failed" });
      });
  }
}
module.exports = {
  getSessionHandler,
  loginHandler,
  registerHandler,
  logoutHandler,
  getUserInfoHandler,
  updateInfoUserHandler,
  updateUserInerest,
  getUserHandler,
};
