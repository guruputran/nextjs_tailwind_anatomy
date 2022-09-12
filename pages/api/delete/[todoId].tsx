import { MongoClient, ObjectId } from "mongodb"

async function handler(req: any, resp: any){
    
    const {todoId} = req.query

    console.log("the query was:", todoId)

    if(req.method !== 'DELETE') return
    
    const client = await MongoClient.connect(`${process.env.MONGO_URI}`)
    const db = client.db()
    const collection = db.collection("todos")
    const result = (await collection.deleteOne({_id: new ObjectId(todoId)})).deletedCount;
    client.close()

    console.log("deleted count::::"+result)

    return resp.json({
        todo: result,
        message: "To do deleted"
    })
}

export default handler 
