class User {
  constructor(model) {
    this.Model = model;
  }
  async signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error('Passwords must match');
    }

    return this.Model.create(signUpData);
  }
  async signIn(signInData, ctx) {
    try {
      const user = await ctx.authenticate(signInData);
      return user;
    } catch (err) {
      return err;
    }
  }
  signOut() {
    return 'signing out';
  }
}

module.exports = User;
