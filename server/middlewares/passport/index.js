const GraphqlStrategy = require('./strategies');

exports.init = (passport) => {
  passport.use(
    'graphql',
    new GraphqlStrategy((options, done) => {
      console.log('calling verify fucntion of strategy');
      // Find user in a db and if user exists , verify user password
      // If user is verified , call done callback

      if (true) {
        // Firstparam of done is reserverd for "error".second one is for "user"
        done();
      }
    })
  );
};
