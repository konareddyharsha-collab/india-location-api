const express = require("express");
const router = express.Router();

const locations = require("../data.json");


router.get('/states', (req, res) => {
    res.json(locations.states);
});


router.get('/districts', (req, res) => {

    let districts = [];

    locations.states.forEach(state => {
        districts = districts.concat(state.districts);
    });

    res.json(districts);
});


router.get('/villages', (req, res) => {

    let villages = [];

    locations.states.forEach(state => {

        state.districts.forEach(district => {

            villages = villages.concat(district.villages);

        });

    });

    res.json(villages);
});


router.get('/villages/:villageName', (req, res) => {

    const villageName = req.params.villageName.toLowerCase();

    let foundVillage = null;

    locations.states.forEach(state => {

        state.districts.forEach(district => {

            const village = district.villages.find(
                v => v.name.toLowerCase() === villageName
            );

            if (village) {
                foundVillage = village;
            }

        });

    });

    if (!foundVillage) {
        return res.status(404).json({
            error: "Village not found"
        });
    }

    res.json(foundVillage);
});

module.exports = router;