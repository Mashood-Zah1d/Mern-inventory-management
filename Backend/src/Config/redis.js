import { createClient } from 'redis'

const client = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
})

client.on("connect",()=>{
    console.log("Redis Connected On Server 6379");
})

client.on("error",(err)=>{
    console.log("Redis Error While Connecting"+err);
})
await client.connect();

export const cache = {
    async get (key){
       try {
         const value = await client.get(key);
         if(!value){
             return null;
         }
         return JSON.parse(value);
       } catch (error) {
         console.log("Error Setting Value In Redis"+error);
       }
    },

    async set (key,value,ttl=3600){
      try {
         const result = await client.setEx(key,ttl,JSON.stringify(value));
         if (!result) {
          console.log("Error Setting Value In Redis ");
          return;
         }
      } catch (error) {
        console.log("Error Setting Value In Redis"+error);
      }
    }
}