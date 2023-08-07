import { MongoClient } from "mongodb";
async function getHandler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://ashish8364:Ashish143@cluster0.oovrhrs.mongodb.net/pendingTodo?retryWrites=true&w=majority"
      );
      const db = client.db();
      const collection = db.collection("pendingTodo");

      // Fetch data from MongoDB collection (e.g., find all documents)
      const data = await collection.find({}).toArray();

      client.close();

      // Send the fetched data as a JSON response
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
export default getHandler;
