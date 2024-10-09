import mongoose, {Mongoose} from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL

interface MongooseConnection {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
}

// next.js in serverless. Serverless functions are stateless menaing  that they start up to handle a request and 
// shut down right after without maintaining a continuous connection to databases. HTis approach ensures that each 
// request is handled independently allowing for better scalability and reliability as there is no need to maintain
// persistent connection across many instances whihc works weel with flexible nature of next.js. But doing that 
// without any optimization would mean too many mongodb connections open for each and every action we perform on 
// the server side. So to optimize the process we resort to caching our connection

let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null
    }
}

export const connectToDatabase = async() => {
    if(cached.conn) return cached.conn

    if(!MONGODB_URL) throw new Error("Missing MONGODB_URL")

    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: "Imaginify",
        bufferCommands: false
    })

    cached.conn = await cached.promise

    return cached.conn
}