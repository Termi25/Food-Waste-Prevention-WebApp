const express = require("express");
const cors = require("cors");

const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "ps_FW_TW.db",
});

//http://localhost:8080/sync

const User =sequelize.define("user",{
  id_user:{
      type: Sequelize.UUID,
      defaultValue:Sequelize.UUIDV4,
      primaryKey: true,
  },
  username: {
      type:Sequelize.STRING,
      allowNull: false,
      unique:true,
      validate:{
          len:[3,200],
      },
  },
  password:{
      type:Sequelize.STRING,
      allowNull:false,
      validate:{
          len:[8,64],        
      },
  },
  emailAdress:{
      type:Sequelize.STRING,
      allowNull:false,
      unique: true,
      validate:{
          isEmail:true,
      },
  },
  typeOfEater:{
      type:Sequelize.STRING,
      allowNull:false,
      validate:{
          len:[3,200]
      },
  },
});

const Food=sequelize.define("food",{
  id_food:{
      type: Sequelize.UUID,
      defaultValue:Sequelize.UUIDV4,
      primaryKey: true,
  },
  food_name: {
      type:Sequelize.STRING,
      allowNull: false,
      validate:{
          len:[3,200],
      },
  },
  ExpirationDate:{
      type:Sequelize.DATEONLY,
      allowNull:false,
  },
  FoodType:{
      type:Sequelize.STRING,
      allowNull:false,
      validate:{
          len:[3,200]
      },
  },
});

const FriendRelation=sequelize.define("friendRelation",{
  id_friendRel:{
      type: Sequelize.UUID,
      defaultValue:Sequelize.UUIDV4,
      primaryKey: true,
  },
  status: {
      type:Sequelize.STRING,
      allowNull: false,
      defaultValue:"pending",
  },
  eticheta1:{
    type:Sequelize.STRING,
      allowNull: false,
      defaultValue:"-",
  },
  eticheta2:{
    type:Sequelize.STRING,
      allowNull: false,
      defaultValue:"-",
  },
  user_id2:{
    type:Sequelize.UUIDV4,
    allowNull:false
  },
});

const ClaimRequest=sequelize.define("claimRequest",{
  id_claim:{
      type: Sequelize.UUID,
      defaultValue:Sequelize.UUIDV4,
      primaryKey: true,
  },
  status: {
      type:Sequelize.STRING,
      allowNull: false,
      defaultValue:"pending",
  },
  requestMessage:{
    type:Sequelize.STRING,
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
app.use(express.json());

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
app.get("/:id_user/foods", async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user)
    if(user){
      const foods=await user.getFood()
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
app.post("/:id_user/foods",async(req,res,next)=>{
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
app.put('/:id_user/foods/:id_food',async(req,res,next)=>{
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
app.delete('/:id_user/foods/:id_food', async(req,res,next)=>{
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
app.get("/:id_user/friendRelations", async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user)
    if(user){
      const friends=await user.getFriendRelations()
      if(friends.length >0){
        res.json(friends)
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
app.post("/:id_user1/friendRelation",async(req,res,next)=>{
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

// UPDATE friendRelation -functional
app.put('/:id_user/friendRelation/:user_id2',async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user)
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
app.delete('/:id_user/friendRelation/:user_id2', async(req,res,next)=>{
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
app.get("/:id_user/claimRequests", async(req,res,next)=>{
  try{
    const user=await User.findByPk(req.params.id_user)
    if(user){
      const claims=await user.getClaimRequests()
      if(claims.length >0){
        res.json(claims)
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

// // SELECT all claims for user food
// app.get("/:id_user/claimRequest", async(req,res,next)=>{
//   try{
//     const user=await User.findByPk(req.params.id_user)
//     if(user)
//     {
//       const claims =await user.claimRequests({ where: {id_user: req.params.id_user}})
//       if(claims.length>0){
//         res.json(claims)
//       }else{
//         res.sendStatus(204)
//       }
//     }else{
//       res.sendStatus(404)
//     }
//   }catch(err){
//     next(err)
//   }
// });

// INSERT claim on certain food by certain user -functional
app.post("/:id_user/:id_food/claimRequest",async(req,res,next)=>{
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
app.put('/:id_claim/claimRequest',async(req,res,next)=>{
  try{
    const claim=await ClaimRequest.findByPk(req.params.id_claim)
    if(claim)
    {
      await claim.update(req.body)
      res.sendStatus(204)
    }else{
      res.sendStatus(404)
    }
  }catch(err){
    next(err)
  }
});

// DELETE claim
app.delete('/:id_claim/claimRequest', async(req,res,next)=>{
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
