// const examDetail = require('../Models/examDetail')
const { test } = require('../Models/candidateAnswer')
const { user } = require('../Models/userRecord')

const viewPerformance = async(req, res) => {

    try {

        let testRecord = await test.find().sort({ "candidateId": '1' })
        let candidateRecord = await user.find({ accountType: 'Student' }).sort({ "_id": '1' })
            // let sortedvalues2 = values2.sort({ "_id": '1' })
        console.log(candidateRecord)
        res.send({ a: testRecord, b: candidateRecord })
    } catch (error) {
        res.send(error)
    }
}
module.exports = {
    viewPerformance
}