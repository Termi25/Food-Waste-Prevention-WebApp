import express, { json } from "express";
import cors from "cors";

import Sequelize from "sequelize";
const { UUID, UUIDV4, STRING, DATEONLY, BOOLEAN, Op}=Sequelize

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "ps_FW_TW.db",
});

//http://localhost:8080/sync

const User =sequelize.define("user",{
  id_user:{
      type: UUID,
      defaultValue:UUIDV4,
      primaryKey: true,
  },
  username: {
      type:STRING,
      allowNull: false,
      unique:true,
      validate:{
          len:[3,200],
      },
  },
  password:{
      type:STRING,
      allowNull:false,
      validate:{
          len:[8,64],        
      },
  },
  emailAdress:{
      type:STRING,
      allowNull:false,
      unique: true,
      validate:{
          isEmail:true,
      },
  },
  typeOfEater:{
      type:STRING,
      allowNull:false,
      validate:{
          len:[3,200]
      },
  },
});

const Food=sequelize.define("food",{
  id_food:{
      type: UUID,
      defaultValue:UUIDV4,
      primaryKey: true,
  },
  food_name: {
      type:STRING,
      allowNull: false,
      validate:{
          len:[3,200],
      },
  },
  ExpirationDate:{
      type:DATEONLY,
      allowNull:false,
  },
  FoodType:{
      type:STRING,
      allowNull:false,
      validate:{
          len:[3,200]
      },
  },
  Claimable:{
    type:BOOLEAN,
    allowNull:false,
  }
});

const FriendRelation=sequelize.define("friendRelation",{
  id_friendRel:{
      type: UUID,
      defaultValue:UUIDV4,
      primaryKey: true,
  },
  status: {
      type:STRING,
      allowNull: false,
      defaultValue:"pending",
  },
  eticheta1:{
    type:STRING,
      allowNull: false,
      defaultValue:"-",
  },
  eticheta2:{
    type:STRING,
      allowNull: false,
      defaultValue:"-",
  },
  user_id2:{
    type:UUIDV4,
    allowNull:false
  },
});

const ClaimRequest=sequelize.define("claimRequest",{
  id_claim:{
      type: UUID,
      defaultValue:UUIDV4,
      primaryKey: true,
  },
  status: {
      type:STRING,
      allowNull: false,
      defaultValue:"pending",
  },
  requestMessage:{
    type:STRING,
      allowNull: false,
      defaultValue:"i would like to take that product off your hands.",
  },
});

const app = express();

User.hasMany(FriendRelation)
User.hasMany(Food)
User.hasMany(ClaimRequest)
Food.hasMany(ClaimRequest)

app.use(cors());
app.use(json());

//User Routers

//INSERT all INTO users -functional
app.get("/sync", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    const sampleData = [
      {
        username: "first-user",
        password: "johndoe12",
        emailAdress: "regularUser1@gmail.com",
        typeOfEater:"carnivor",
      },
      {
        username: "second-user",
        password: "janedoe12",
        emailAdress: "regularUser2@gmail.com",
        typeOfEater:"vegetarian",
      },
      {
        username: "third-user",
        password: "alicedoe",
        emailAdress: "powerUser@gmail.com",
        typeOfEater:"echilibrat",
      },
    ];
    for (const item of sampleData) {
      const user = new User(item);
      await user.save();
    }
    res.status(201).json({ message: "sample db created" });
  } catch (err) {
    next(err);
  }
});


// SELECT all users FROM users -functional
app.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

//SELECT user From users by id -functional
app.get("/users/:id_user",async (req,res,next)=>{
  try{
    const id=req.params.id_user;
    const users=await User.findAll({ where: { id_user:id}})
    if(users.length===1){
      const user=users.shift()
      return res.status(201).json(user);
    }else{
      return res.status(401).json({message:"Invalid user identifier"});
    }
  }catch(err){
    next(err);
  }
});

//SELECT all user From users by !id and !friends -functional
app.get("/users/not/:id_user",async (req,res,next)=>{
  try{
    let users=await User.findAll({ where: { id_user:{[Op.ne]:req.params.id_user}}})
    const friends=await FriendRelation.findAll({where:{userIdUser:req.params.id_user}})
    if(users.length>0){
      if(friends.length>0){
        for(let i=0;i<users.length;i++){
          for(let j=0;j<friends.length;j++){
              if(users[i].id_user===friends[j].user_id2){
                users.splice(i,1)
              }
          }
        }    
      }
      return res.status(201).json(users);
    }else{
      return res.status(401).json({message:"Invalid user identifier"});
    }
  }catch(err){
    next(err);
  }
});

//SELECT all user From users by !id  -functional
app.get("/users/not/global/:id_user",async (req,res,next)=>{
  try{
    let users=await User.findAll({ where: { id_user:{[Op.ne]:req.params.id_user}}})
    if(users.length>0){
      return res.status(201).json(users);
    }else{
      return res.status(401).json({message:"Invalid user identifier"});
    }
  }catch(err){
    next(err);
  }
});

//SELECT all user From users by !id and friends -functional
app.get("/users/friends/:id_user",async (req,res,next)=>{
  try{
    let users=await User.findAll({ where: { id_user:{[Op.ne]:req.params.id_user}}})
    const friends=await FriendRelation.findAll({where:{userIdUser:req.params.id_user}})
    if(users.length>0){
      if(friends.length>0){
        for(let i=0;i<users.length;i++){
            if(users[i].id_user!==friends[i].user_id2){
              users.splice(i,1)
            }
        }    
      }
      return res.status(201).json(users);
    }else{
      return res.status(401).json({message:"Invalid user identifier"});
    }
  }catch(err){
    next(err);
  }
});

//SELECT user From users by email -functional
app.get("/users/friends/:email",async (req,res,next)=>{
  try{
    const users=await User.findAll({ where: { emailAdress:req.params.email}})
    if(users.length===1){
      const user=users.shift()
      res.status(201).json(user);
    }else{
      res.status(401).json({message:"Invalid user email"});
    }
  }catch(err){
    next(err);
  }
});

//AUTH request -functional
app.post("/auth",async (req,res,next)=>{
  try{
    const {email,password}=req.body;

    const users=await User.findAll({ where: { emailAdress:email}})
    if(users.length===1){
      const user=users.shift()
      if(password===user.password){
        console.log("Succesful auth");
        res.status(201).json(user);
      }else{
        console.log("Failed auth");
        res.status(401).json({message:"Invalid password"});
      }
    }
  }catch(err){
    next(err);
  }
});

// INSERT user INTO users -functional
app.post("/users", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// UPDATE user -functional
app.put('/users/:id_user',async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user)
    if(user)
    {
      await user.update(req.body)
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// // DELETE user
// app.delete('/:id_user/foods/:id_food', async(req,res,next)=>{
//   try{
//     const user=await User.findByPk(req.params.id_user)
//     if(user){
//       const foods =await user.getFoods({ where: { id_food: req.params.id_food}})
//       const food=foods.shift()
//       if(food){
//         await food.destroy()
//         res.sendStatus(204)
//       }else{
//         res.sendStatus(404)
//       }
//     }else{
//       res.sendStatus(404)
//     }
//   }catch(err){
//     next(err)
//   }
// });

//Food Routers

// SELECT all food owned by user -functional
app.get("/foods/:id_user", async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user)
    if(user){
      const foods=await Food.findAll({ where: { userIdUser:req.params.id_user},order:['FoodType','ExpirationDate']})
      if(foods.length >0){
        res.json(foods)
      }else{
        res.sendStatus(204)
      }
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// SELECT all food not owned by user and claimable -functional
app.get("/foods/not/:id_user", async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user)
    if(user){
      const foods=await Food.findAll({ where: { userIdUser:{[Op.ne]:req.params.id_user}, Claimable:true}})
      if(foods.length >0){
        res.json(foods)
      }else{
        res.sendStatus(204)
      }
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// INSERT food with certain user -functional
app.post("/foods/:id_user",async(req,res,next)=>{
  try{
    const user =await User.findByPk(req.params.id_user)
    if(user){
      const food=await Food.create(req.body)
      user.addFood(food)
      await user.save()
      res.status(201).json(food)
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// UPDATE food -functional
app.put('/foods/:id_user/:id_food',async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user)
    if(user)
    {
      const foods =await user.getFood({ where: {id_food: req.params.id_food}})
      const food=foods.shift()
      if(food){
        await food.update(req.body)
      }else{
        res.sendStatus(204)
      }
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// DELETE food with certain user -functional
app.delete('/foods/:id_user/:id_food', async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user)
    if(user){
      const foods =await user.getFood({ where: { id_food: req.params.id_food}})
      const food=foods.shift()
      if(food){
        await food.destroy()
      }else{
        res.sendStatus(204)
      }
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

//FriendRelation Routers

// SELECT all friends with current user -functional
app.get("/friendRelations/:id_user", async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user)
    if(user){
      const friends=await user.getFriendRelations()
      if(friends.length >0){
        let friendsDetailed=[]
        for(let i=0;i<friends.length;i++){
          let query=await User.findByPk(friends[i].user_id2)
          friendsDetailed.push(query)
        }
        res.status(201).json(friendsDetailed)
      }else{
        res.sendStatus(204)
      }
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// INSERT friend with current user -functional
app.post("/friendRelation/:id_user1",async(req,res,next)=>{
  try{
    const user =await User.findByPk(req.params.id_user1)
    if(user){
      const friend=await FriendRelation.create(req.body)
      user.addFriendRelation(friend)
      await user.save()
      res.status(201).location(friend.id_friendRel).send()
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// INSERT friend by email with current user -functional
app.post("/friendRelation/:id_user1/:email",async(req,res,next)=>{
  try{
    const user =await User.findByPk(req.params.id_user1)
    const friendtoAdd=await User.findAll({where:{emailAdress:req.params.email}})
    if(user){
      const friend1=await FriendRelation.create({user_id2:friendtoAdd[0].id_user,userIdUser:user.id_user})
      const friend2=await FriendRelation.create({user_id2:user.id_user,userIdUser:friendtoAdd[0].id_user})
      await User.bulkCreate([friend1,friend2])
      // user.addFriendRelation(friend1)
      // friendtoAdd.addFriendRelation(friend2)
      // await user.save()
      // await friendtoAdd[0].save()
      res.status(204)
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// UPDATE friendRelation -functional
app.put('/friendRelation/:id_user1/:user_id2',async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user1)
    if(user)
    {
      const friends =await user.getFriendRelations({ where: {user_id2: req.params.user_id2}})
      const friend=friends.shift()
      if(friend){
        await friend.update(req.body)
      }else{
        res.sendStatus(204)
      }
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// DELETE friendRelation between 2 users -functional
app.delete('/friendRelation/:id_user/:user_id2', async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user)
    if(user){
      const friends =await user.getFriendRelations({ where: {user_id2: req.params.user_id2}})
      const friend=friends.shift()
      if(friend){
        await friend.destroy()
      }else{
        res.sendStatus(204)
      }
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

//ClaimRequest Routers

// SELECT all claims by current user -functional
app.get("/claimRequests/made/:id_user", async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user)
    if(user){
      const claims=await user.getClaimRequests()
      if(claims.length >0){
        res.status(201).json(claims)
      }else{
        res.sendStatus(204)
      }
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// SELECT all claims for current user -functional
app.get("/claimRequests/received/:id_user", async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user)
    if(user){
      const foods =await Food.findAll({ where: { userIdUser: user.id_user,Claimable:true}})
      const claimsDetailed=[]
      if(foods){
        for(let i=0;i<foods.length;i++){
          const query=await ClaimRequest.findAll({where:{foodIdFood:foods[i].id_food}})
          claimsDetailed.push(query.shift())
        }
        if(claimsDetailed.length>0){
          res.status(201).json(claimsDetailed)
        }else{
          res.sendStatus(204)
        }
      }
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// SELECT claim by current user for certain claimable food -functional
app.get("/claimRequests/check/:id_user/:id_food", async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user)
    if(user){
      const claims=await ClaimRequest.findAll({
        where:{
          userIdUser:req.params.id_user, 
          foodIdFood:req.params.id_food,
          status: ['pending', 'accepted']
      }
    })
      if(claims.length >0){
        res.status(201).json(claims.shift())
      }else{
        res.sendStatus(204)
      }
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// SELECT all claims for current user food -functional
app.get("/claimRequest/not/:id_user", async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user)
    if(user)
    {
      const food=await user.getFood()
      if(food.length>0){
        let claimsDetailed=[]
        for(let i=0;i<food.length;i++){
          let query=await ClaimRequest.findAll({where:{foodIdFood: food[i].id_food}})
          claimsDetailed.push(query)
        }
        res.status(201).json(claimsDetailed)
      }
      else{
        res.sendStatus(204)
      }
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// SELECT owner for current claimRequest - functional
app.get("/claimRequest/:id_claim", async(req,res,next)=>{
  try{
    const claim=await ClaimRequest.findByPk(req.params.id_claim)
    if(claim)
    {
      const user=await User.findAll({where:{id_user:claim.userIdUser}})
      if(user){
          res.status(201).json(user.shift())
        }else{
          res.sendStatus(204)
      }
    }else{
        res.sendStatus(404)
      }
  }catch(err){
    next(err)
  }
});

// SELECT user for food in current claimRequest - functional
app.get("/claimRequest/owner/:id_claim", async(req,res,next)=>{
  try{
    const claim=await ClaimRequest.findByPk(req.params.id_claim)
    if(claim)
    {
        const food=await Food.findAll({where:{id_food:claim.foodIdFood}})
        if(food){
          const user=await User.findAll({where:{id_user:food[0].userIdUser}})
          if(user){
            res.status(201).json(user.shift())
          }else{
            res.sendStatus(204)
          }
        }
        else{
          res.sendStatus(404)
        }
    }else{
        res.sendStatus(404)
      }
  }catch(err){
    next(err)
  }
});

// SELECT food for current claimRequest -functional
app.get("/claimRequest/food/:id_claim", async(req,res,next)=>{
  try{
    const claim=await ClaimRequest.findByPk(req.params.id_claim)
    if(claim)
    {
        const food=await Food.findAll({where:{id_food:claim.foodIdFood}})
        if(food){
          res.status(201).json(food.shift())
        }
        else{
          res.sendStatus(204)
        }
    }else{
        res.sendStatus(404)
      }
  }catch(err){
    next(err)
  }
});

// INSERT claim on certain food by certain user -functional
app.post("/claimRequest/:id_food/:id_user",async(req,res,next)=>{
  try{
    const user =await User.findByPk(req.params.id_user)
    const food =await Food.findByPk(req.params.id_food)
    if(user && food){
      const claim=await ClaimRequest.create(req.body)
      user.addClaimRequest(claim)
      food.addClaimRequest(claim)
      await user.save()
      await food.save()
      res.status(201).location(claim.id_claim).send()
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// UPDATE claim -functional
app.put('/claimRequest/:id_claim',async(req,res,next)=>{
  try{
    const claim=await ClaimRequest.findByPk(req.params.id_claim)
    if(claim)
    {
      if(req.body.status==='accepted'){
        const food=await Food.findByPk(claim.foodIdFood)
        food.userIdUser=claim.userIdUser
        food.Claimable=false
        console.log(food)
        await food.save()
        await claim.update(req.body)
      }else{
        await claim.update(req.body)
      }
      res.sendStatus(204)
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// DELETE claim
app.delete('/claimRequest/:id_claim', async(req,res,next)=>{
  try{
    const claim=await ClaimRequest.findByPk(req.params.id_claim)
    if(claim){
      await claim.destroy()
      res.sendStatus(204)
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

app.use((err, req, res, next) => {
  console.warn(err);
  res.status(500).json({ message: "Server error" });
});

app.listen(8080, () => {
  console.log("The server is listening!");
});
