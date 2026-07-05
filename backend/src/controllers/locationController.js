const Location = require('../models/locationModel');

exports.getStates = async (req, res) => {
    try {
        const states = await Location.distinct('state');
        res.json(states.sort());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getStateById = async (req, res) => {
    try {
        const { stateId } = req.params;
        const districts = await Location.find({ state: stateId }).distinct('district');

        if (!districts.length) {
            return res.status(404).json({ error: 'State not found' });
        }

        res.json({ state: stateId, districts });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getStateDistricts = async (req, res) => {
    try {
        const { stateId } = req.params;
        const districts = await Location.find({ state: stateId }).distinct('district');

        if (!districts.length) {
            return res.status(404).json({ error: 'State not found' });
        }

        res.json(districts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDistrictById = async (req, res) => {
    try {
        const { districtId } = req.params;
        const villages = await Location.find({ district: districtId });

        if (!villages.length) {
            return res.status(404).json({ error: 'District not found' });
        }

        const district = villages[0].district;
        const state = villages[0].state;
        res.json({ district, state, villages: villages.map((item) => item.village) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDistrictVillages = async (req, res) => {
    try {
        const { districtId } = req.params;
        const villages = await Location.find({ district: districtId }).distinct('village');

        if (!villages.length) {
            return res.status(404).json({ error: 'District not found' });
        }

        res.json(villages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getVillageById = async (req, res) => {
    try {
        const { villageId } = req.params;
        const village = await Location.findOne({ village: villageName });

        if (!village) {
            return res.status(404).json({ error: 'Village not found' });
        }

        res.json(village);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchLocations = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const results = await Location.find({
            $or: [
                { state: { $regex: q, $options: 'i' } },
                { district: { $regex: q, $options: 'i' } },
                { subDistrict: { $regex: q, $options: 'i' } },
                { village: { $regex: q, $options: 'i' } }
            ]
        });

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};