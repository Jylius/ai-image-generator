 const express = require("express")
 const axios = require("axios")
 const cors = require("cors")
 require("dotenv").config();

 const app = express()
 app.use(cors())

 const invokeUrl = "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-xl"
 const API_KEY = process.env.API_KEY

 app.use(express.json())

 app.post('/gen_z_generator', async (req,res)=> {
    try {
        const response = await axios.post(invokeUrl, req.body, {
                 headers : {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Accept": "application/json",
                }
            })
            res.json(response.data)
    } catch (error) {
        res.status(500).send({error: " apı request not succesful"})
        
    }
})


const PORT = 3131   
app.listen(PORT, ()=> console.log("server is listening"))