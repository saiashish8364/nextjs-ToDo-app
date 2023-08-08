import { MongoClient, ObjectId } from "mongodb";
async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const data = req.body;
      const id = data.id;
      const client = await MongoClient.connect(
        "mongodb+srv://ashish8364:Ashish143@cluster0.oovrhrs.mongodb.net/pendingTodo?retryWrites=true&w=majority"
      );
      const db = client.db();
      const todos = db.collection("pendingTodo");
      const result = await todos.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            todo: data.todo,
            todoStatus: data.todoStatus,
          },
        }
      );
      client.close();

      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating document" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
export default handler;
