const express = require('express');
const ServerConfig = require('./config/serverConfig');
const cookieParser = require('cookie-parser')
const connectDb = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const AuthRouter = require('./routes/authRoute');
const uploader = require('./middlewares/multerMiddlewares');
const cloudinary = require('./config/cloudinaryConfig');
const fs = require('fs/promises');
const productRouter = require('./routes/productRoute');

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extend:true}))

// Routing middleWares
app.use('/users', userRouter) // connects the routers to the server
app.use('/carts', cartRouter);
app.use('/auth', AuthRouter);
app.use('/products', productRouter);

app.get("/ping",(req, res)=>{
    console.log(req.body);
    console.log(req.cookies);
    
   return res.json({
    message: "pong"
   })
})

app.post('/photo', uploader.single('incomingFile'), async (req, res) => {
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("result from cloudinary",result);
    
    await fs.unlink(req.file.path); // file will be delete from uploads file
    
    return res.json({
        message: "ok"
    })
})
app.listen(ServerConfig.PORT, async ()=>{
    await connectDb();
    console.log(`server started on ${ServerConfig.PORT}`);

    // const newUser = await user.create({
    //     email: "shivamRaj@gmail.com",
    //     firstName: "Shivam",
    //     lastName: "Singh",
    //     mobileNumber:"4265465485",
    //     passWord:"475hfhb88",
    // });

    // console.log("create a newUser");
    // console.log(newUser);
    
})