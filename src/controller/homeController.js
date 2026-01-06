import userService from '../service/userService';

const handleHelloWorld = (req, res) => {
    // return res.send("Hello world from controller");
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render("user.ejs", {userList});
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email, password, username);

    return res.redirect("/user");
}

const handleDeleteUser = async (req, res) => {
    console.log(">>> check id:", req.params.id);

    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser, handleDeleteUser
}