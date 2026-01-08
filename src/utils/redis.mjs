import redis from "redis"
import dotenv from "dotenv"
dotenv.config()

const redisCLient = redis.createClient({
    url : process.env.REDIS_CACHE_SERVER,
    socket : {
        tls : true
    }
})

redisCLient.on("connect" , () => {
    console.log("redis connected at ",process.env.REDIS_CACHE_SERVER)
    
})

redisCLient.on("error",(error)=>{
    console.log(error)
})

await redisCLient.connect()

export default redisCLient