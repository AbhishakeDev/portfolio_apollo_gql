const { Strategy } = require('passport-strategy');

//Strategy gets options(email,password) needed to authenticate user
// Strategy gets a callback function that will contain functionality to verify an user
// strategy has to have "authenticate" function
// Strategy has access to "error" "fail" and "success" functions
class GraphqlStrategy extends Strategy {
  constructor(verify) {
    super();

    if (!verify) {
      throw new Error('GraphqlStrategy requires an veify callback');
    }

    this.verify = verify;
    this.name = 'graphql';
  }

  authenticate(_, options) {
    console.log('Calling authenticate in strategy');
    //in done we will recieve "error","user","info"
    const done = () => {
      if (true) {
        // this.success('Logged In User');
        this.error('some nasty error');
      }

      // if user then call success otherwise call "fail" or "error"
    };
    this.verify(options, done);
  }
}

module.exports = GraphqlStrategy;
