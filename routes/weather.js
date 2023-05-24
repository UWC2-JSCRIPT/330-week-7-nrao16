const { Router } = require('express');
const router = Router();
const weatherDAO = require('../daos/weather');

router.get("/", (req, res, next) => {
    try {
        res.send(`
        <form action="/weather/location" method="GET">
          <label for="locationName">Enter a location:</label><br>
          <input type="text" name="name" placeholder="Name"><br>
          <input type="submit" value="Submit">
        </form>
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
                name: `${name}`,
                temperature: 'not available'
            });
        }

        return res.render('weather', {
            name: `${name}`,
            temperature: `${locationWeather.temperature}`
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;