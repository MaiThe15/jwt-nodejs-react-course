const handleHelloWorld = (req, res) => {
    // return res.send("Hello world from controller");
    return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs");
}

module.exports = {
    handleHelloWorld, handleUserPage
}