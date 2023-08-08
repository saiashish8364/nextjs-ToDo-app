import { MongoClient, ObjectId } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://ashish8364:Ashish143@cluster0.oovrhrs.mongodb.net/pendingTodo?retryWrites=true&w=majority"
    );
    const db = client.db();
    const todos = db.collection("pendingTodo");
    const result = await todos.insertOne(data);
    client.close();
    res.status(201).json(result);
  }
}
export default handler;
