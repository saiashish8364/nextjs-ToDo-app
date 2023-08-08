import { MongoClient, ObjectId } from "mongodb";
async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const parsedObject = JSON.parse(req.body);
      const id = parsedObject.id;
      const client = await MongoClient.connect(
        "mongodb+srv://ashish8364:Ashish143@cluster0.oovrhrs.mongodb.net/pendingTodo?retryWrites=true&w=majority"
      );
      const db = client.db();
      const collection = db.collection("pendingTodo");

      // Fetch data from MongoDB collection (e.g., find all documents)
      const data = await collection.deleteOne({ _id: new ObjectId(id) });

      client.close();

      // Send the fetched data as a JSON response
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
export default handler;
