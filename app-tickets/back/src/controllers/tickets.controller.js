const getAll = (req, res, next) => {
    res.json('getAll');
}

const create = (req, res, next) => {
    res.json('create');
}

module.exports = {
    getAll, create
}