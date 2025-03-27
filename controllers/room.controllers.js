const catchAsync = require("./../utils/catchAsync")
const {status} = require("http-status")

exports.createRoom=catchAsync(async(req,res)=>{
    const room = await roomService.createRoom(req.body);
    res.status(status.CREATED).json({room})
})