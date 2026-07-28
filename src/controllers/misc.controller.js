function mainPage(req, res) {
    res.status(200).json({ message: "Welcome to the main page!" });
}

function pingPage(req, res) {
    res.status(200).json({ message: "Ok!" });
}

function aboutPage(req, res) {
    res.status(200).json({ message: "Welcome to the about page!" });
}

export default { mainPage, pingPage, aboutPage };