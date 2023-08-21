const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//@desc getgoals
//@route GET /ap/goals
//@access Pivate
const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
  
})


//@desc setgoals
//@route POST /ap/goals
//@access Pivate
const setGoal = asyncHandler(async (req,res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('please add a text field')
    }
    const goal = await Goal.create({
        text:req.body.text,
        user: req.user.id
    })
  
    res.status(201).json(goal);
  
})

//@desc updategoals
//@route PUT /ap/goals/:id
//@access Pivate
const updateGoal = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('user not found')
    }
    if (goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('user not authorised')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    })


    res.status(200).json(updatedGoal)


})



//@desc deletegoals
//@route DELETE /ap/goals/:id
//@access Pivate
const deleteGoal = asyncHandler(async (req,res) => {

    const goal = await Goal.findById(req.params.id);
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('user not found')
    }
    if (goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('user not authorised')
    }

    await Goal.findByIdAndRemove(req.params.id, req.body, {
        new:true,
    })

  
      
    res.status(200).json({id :req.params.id});


})

  module.exports = {
      getGoals,
      setGoal,
      updateGoal,
      deleteGoal,
  }