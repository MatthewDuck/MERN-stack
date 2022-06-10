const UserNotFoundError = require('../error/user-not-found-error');

function User(username, email, age) {
    this.username = username;
    this.email = email;
    this.age = age;
}

User.idCounter = 1;
User.database = [];

User.save = function(user) {
    if(user.id) {
        const existingUser = User.find(user.id);

        if(user.email) existingUser.email = user.email;
        if (user.age) existingUser.age = user.age;
        return existingUser;
    } else {
        //  if (Object.keys(user.username).length < 3 || Object.keys(request.body.username).length > 33) return next({ statusCode: 400, message: 'Username must be between 3 and 32 characters' })
        // const newUsername = request.body.username;
        // for (i = 0; i <= (User.datebase).length() ; i++) {
        //     if (newUsername == i.username) return next({ statusCode: 400, message: 'Usernames must be unique' });
        // }
        user.id = User.idCounter++;
        User.database.push(user);
        return user;
    }
}

User.findAll = function() {
    return User.database;
}

User.find = function(id) {
    const user = User.database.find(user => user.id == id);

    if(!user) throw new UserNotFoundError(id);

    return user;
}

User.delete = function(id){
    const userIndex = User.database.find(user => user.id == id);
    if (userIndex === -1) throw new UserNotFoundError(id);

    User.database.splice(userIndex, 1);
}

module.exports = User;