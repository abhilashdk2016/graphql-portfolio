class User {
  constructor(model) {
    this.Model = model;
  }

  getAuthuser(ctx) {
    if(ctx.isAuthenticated()) {
      return ctx.getUser();
    }

    return null;
  }

  async signIn(data, ctx) {
    try {
      const user = await ctx.authenticate(data);
      return user;
    } catch (error) {
      return error;
    }
    
  }

  async signUp(data) {
    if(data.password !== data.passwordConfirmation) {
      throw new Error("Passwords does not match");
    }
    try {
      return await this.Model.create(data);
    } catch(error) {
      if(error.code && error.code === 11000) {
        throw new Error('User with provided email already exists');
      } 

      throw error;
      
    }
  }

  signOut(ctx) {
    try {
      ctx.logout();
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = User;
