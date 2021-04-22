
exports.portfolioQueries = {
  portfolio: (root, { id }, ctx) => {
    return ctx.models.Portfolio.getById(id)
  },
  portfolios: (root, args, ctx) => {
    return ctx.models.Portfolio.getAll();
  },
  userPortfolios: (root, args, ctx) => {
    return ctx.models.Portfolio.getAllByUser();
  }
}

exports.userQueries = {
  user: (root, atrgs, ctx) => {
    return ctx.models.User.getAuthuser(ctx);
  }
}

exports.portfolioMutations = {
  createPortfolio: async (root, { portfolio }, ctx) => {
    const createdPortfolio = await ctx.models.Portfolio.create(portfolio)
    return createdPortfolio;
  },
  updatePortfolio: async (root, { id, portfolio }, ctx) => {
    const updatedPortfolio = await ctx.models.Portfolio.findAndUpdate(id, portfolio);
    return updatedPortfolio;
  },
  deletePortfolio: async (root, { id }, ctx) => {
    const deletedId = await ctx.models.Portfolio.findAndDelete(id);
    return deletedId._id;
  }
}

exports.userMutations = {
  signIn:(root, { input }, ctx) => {
    return ctx.models.User.signIn(input, ctx);
  },
  signUp: async (root, { input }, ctx) => {
    const registerdUser = await ctx.models.User.signUp(input);
    return registerdUser._id;
  },
  signOut:(root, args, ctx) => {
    return ctx.models.User.signOut(ctx);
  }
}
