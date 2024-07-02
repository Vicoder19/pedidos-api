
const internalError = (error, res) => {
    console.error(error.message);
    return res.status(500).send('Server Error');
}

const notFound = (res) => {
    return res.status(404).send('Not Found');
}

const paramIsInteger = (req, res, next) => {
    const {id} = req.params;

    if (!Number.isInteger(Number(id))){
        return res.status(400).send('Must be Integer');    
    }

    next();
}

const badRequest = (res) => {
    return res.status(400).send('Bad Request');
}

module.exports = {
    internalError,
    notFound,
    paramIsInteger,
    badRequest
};