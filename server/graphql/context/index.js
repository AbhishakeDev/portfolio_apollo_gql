const passport = require('passport');

// options = {email,password}
const authenticateUser = (options) => {
  return new Promise((res, rej) => {
    console.log(`Calling authenticateUser`);

    const done = (error, user) => {
      // Here we will get user if user is authenticated
      // If we are getting user here we can save session to DB
      if (error) {
        rej(new Error(error));
      }

      if (user) {
        return res(user);
      }
    };

    const authFn = passport.authenticate('graphql', options, done);
    authFn();
    return true;
  });
};

exports.buildAuthContext = () => {
  const auth = {
    authenticate: (options) => authenticateUser(options),
  };

  return auth;
};
