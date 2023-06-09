const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");


exports.findAll = async(req,res)=>{

    let userTypeReq = req.query.userType;
    let userStatusReq = req.query.userstatus;
    let userNameReq = req.query.name;

    var users;

    if(userNameReq){
        try{
            users = await User.find({
                userName : userNameReq
            });

        }catch(err){
            console.err("error while fetching the user for username:",userNameReq);
            res.status(500).send({
                message:"Some internal error occured"
            })
        }
    }else if(userTypeReq && userStatusReq){

        try{
            users = await User.find({
                userType: userTypeReq,
                userStatus: userStatusReq
            });
        }catch(err){
            console.err(`error while fetching the user and userType [${userTypeReq}] + and userStatus [${userStatusReq}]`)
            res.status(500).send({
                message:"some internal error occued"
            })
        }
    }else if(userTypeReq){
        try{
            users = await User.find({
                userType:userTypeReq
            });
        }catch(err){
            console.err(`error while fetching the userType [${userTypeReq}]`)
            res.status(500).send({
                message:"some internal error occured"
            })
        }
    }else if(userStatusReq){
        try{
            users = await User.find({
                userStatus:userStatusReq
            });
        }catch(err){
            console.err(`error while fetching the userStatus [${userStatusReq}]`)
            res.status(500).send({
                message:"some internal error occured"
            })
        }
    }else{
        try{
            user = await User.find();
        }catch(err){
            console.err(`error while fetching the users`)
            res.status(500).send({
                message:"some internal error occured"
            })
        }
    }
    res.status(200).send(objectConverter.userResponse(users))
}
exports.findById = async(req,res)=>{
    const userReq = req.params.userId;

    const user = await User.find({
        userId: userReq
    })
    if(user){
        res.status(200).send(objectConverter.userResponse(user));
    }else{
        res.status(200).send({
            message:`User with this id [${userReq}] is not present`
        })
    }
}