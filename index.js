const express = require('express');
const path = require('path')
const app = express();
const urlRoute = require('./routes/url')
const {connectToMongoDB} = require('./connect')
const PORT = 8001;
const URL = require('./models/url')
const staticRoute = require('./routes/staticRouter')

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log('mongoDB connected'))

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))


app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/',staticRoute)
app.use('/url',urlRoute)
app.get('/url/:shortId', async (req,res)=>{
    const shortId=req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
        $push:{
            visitHistory:{timestamp:Date.now()},
        },
        
    },
    { new: true })
    console.log(entry)
    res.redirect(entry.redirectUrl)
})
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));