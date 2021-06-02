const { editMoim } = require('../model/moimModel');
const searchModel = require('../model/searchModel');

exports.searchMoim = (req, res) => {

    let searchWord = req.query.searchWord;
    let location = req.query.location;

    let bind = {
        'searchWord' : searchWord,
        'location' : location
    }

    searchModel.searchMoim(bind, (result) => {
        if (result.state === 200) {
            res.json({
                'state' : result.state,
                'message' : result.message,
                'result' : result.result
            })
        } else if (result.state === 404) {
            res.json({
                'state' : result.state,
                'message' : result.message
            })
        } else if (result.state === 405){
            res.json({
                'state' : result.state,
                'message' : result.message
            })
        } else {
            res.json({
                'state' : 500,
                'message' : '예상치 못한 에러'
            })
        }
    })

}