import redis from "redis"


const redisCLient = redis.createClient({
    url : process.env.REDIS_CACHE_SERVER
})

redisCLient.on("connect" , () => {
    console.log("redis connected at ",process.env.REDIS_CACHE_SERVER)
})

redisCLient.on("error",(error)=>{
    console.log(error)
})

redisCLient.connect()

export default redisCLient