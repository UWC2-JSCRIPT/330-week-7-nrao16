const { Router } = require('express');
const router = Router();
const weatherDAO = require('../daos/weather');

router.get("/", (req, res, next) => {
    try {
        res.send(`
        <html>
    <body>
        <h1>Hello, World</h1>
    </body>
</html>
        `);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.get("/location", async (req, res, next) => {
    try {
        let { name } = req.query;
        if (!name) {
            return res.status(302).redirect('/weather');
        }

        const locationWeather = await weatherDAO.getLocation(name);
        if (!locationWeather) {
            return res.status(404).render('weather', {
                responseMessage: `The weather for ${name} is not available`
            });
        }

        return res.render('weather', {
            responseMessage: `The weather for ${name} is ${locationWeather.temperature}`
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;