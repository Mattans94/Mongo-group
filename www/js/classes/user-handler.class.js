class UserHandler {

    static async check() {
        return await User.find('');
    }

    static async login(email, password) {
        return await Login.find({
            email: email,
            password: password
        });
    }

    static async logout() {
        return await Logout.find('');
    }

    static async register(email, password) {
        return await User.create({
            email: email,
            password: password,
            name: name
        });
    }

    static async registerAndLogin(email, password) {
        await this.logout();
        let result = await this.register(email, password);
        await this.login(email, password);
        return result;
    }

    static async unregister() {
        let user = await User.findOne('');
        if (!user) { return { error: 'No such user' }; }
        let result = await user.delete();
        await this.logout();
        return result;
    }

    static async change(props) {
        let user = await User.findOne('');
        if (!user) { return { error: 'No such user' }; }
        delete props.email;
        Object.assign(user, props);
        await user.save();
        await this.logout();
        await this.login(user.email, user.password);
        return user;
    }

}