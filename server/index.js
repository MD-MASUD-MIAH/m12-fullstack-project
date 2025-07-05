require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const stripe = require('stripe')(process.env.STRIPE_SK_KEY)
const port = process.env.PORT || 3000
const app = express()
// middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token

  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' })
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({ message: 'unauthorized access' })
    }
    req.user = decoded
    next()
  })
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})
async function run() {
  try {

const db = client.db('plantConceptual') 

const plantConlection = db.collection('AllPlant')
const orderCollection = db.collection('order')
const userCollection = db.collection('user')
    // Generate jwt token
    app.post('/jwt', async (req, res) => {
      const email = req.body
      const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '365d',
      })
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true })
    })
    app.post('/add-plant',async(req,res)=>{
 

      const newPlant = req.body 


     
      
   const result =  await plantConlection.insertOne(newPlant)

res.send(result)
    })


    app.post('/order',async(req,res)=>{

      const order = req.body 


      const result = await  orderCollection.insertOne(order)

      res.send(result)  
    })

    app.post('/user',async(req,res)=>{
 
      const userData = req.body
      
      userData.role='customer',
      userData.create_at=new Date().toISOString()
      userData.loggedIn =new Date().toISOString()
      
      const query = {email:userData?.email}

      const alreadyExists = await userCollection.findOne(query) 

      console.log('user already exists',!!alreadyExists)

      if(!!alreadyExists){

        console.log('Updating user Data....');

        const result = await userCollection.updateOne(query,{

          $set:{loggedIn :new Date().toISOString()}
          
        })
        return res.send(result)
      }
      
      console.log('create ting user Data....');
      
    
      const  result = await userCollection.insertOne(userData) 
      


     res.send(result)
})
    app.get('/allplant',async(req,res)=>{


      const result = await plantConlection.find().toArray() 

      res.send(result)
    })

    app.get('/plant/:id',async(req,res)=>{
  const id = req.params.id 
  const query = {_id: new ObjectId(id)}

  const result = await plantConlection.findOne(query) 

  res.send(result)
    })
    // Logout
    app.get('/logout', async (req, res) => {
      try {
        res
          .clearCookie('token', {
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          })
          .send({ success: true })
      } catch (err) {
        res.status(500).send(err)
      }
    })

  // payment post. 
  app.post('/create-payments-intent',async(req,res)=>{
const {plantId,quantity} = req.body 
console.log(plantId,quantity); 

const plant = await plantConlection.findOne({_id:new ObjectId(plantId)})

if(!plant)return res.status(404).send({message:'plant not Found'})



const totalPrice = quantity*plant.price*100

const {client_secret} = await stripe.paymentIntents.create({
  amount:totalPrice, // Amount in smallest currency unit (e.g. 2000 = $20.00)
  currency: 'usd',
  automatic_payment_methods: {
    enabled: true
  },
});


res.send({clientSecret:client_secret})



  }
  )

  

    
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello from plantNet Server..')
})

app.listen(port, () => {
  console.log(`plantNet is running on port ${port}`)
})
