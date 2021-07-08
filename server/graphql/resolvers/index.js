exports.portfolioQueriesResolvers = {
  portfolio: (root, { id }, ctx) => {
    return ctx.models.Portfolio.getById(id);
  },
  portfolios: (root, args, ctx) => {
    return ctx.models.Portfolio.getAll();
  },
};

exports.portfolioMutationsResolvers = {
  createPortfolio: async (root, { portfolioInput }, ctx) => {
    const createdPortfolio = await ctx.models.Portfolio.createPortfolio(
      portfolioInput
    );
    return createdPortfolio;
  },
  updatePortfolio: async (root, { id, portfolioInput }, ctx) => {
    const updatedPortfolio = await ctx.models.Portfolio.findAndUpdate(
      id,
      portfolioInput
    );
    return updatedPortfolio;
  },
  deletePortfolio: async (root, { id }, ctx) => {
    const deletedPortfolio = await ctx.models.Portfolio.findAndDelete(id);
    return deletedPortfolio._id;
  },
};

exports.userMutations = {
  signUp: async (root, { signUpInput }, ctx) => {
    const registeredUser = await ctx.models.User.signUp(signUpInput);
    return registeredUser._id;
  },
  signIn: (root, { signInInput }, ctx) => {
    return ctx.models.User.signIn(signInInput, ctx);
  },
  signOut: (root, args, ctx) => {
    return ctx.models.User.signOut();
  },
};
