const crypto = require("crypto");
const rawKey = crypto.randomBytes(32).toString("hex");
const hashedKey = crypto.createHash("sha256").update(rawKey).digest("hex");
const { MongoClient, ObjectId } = require("mongodb");

async function run() {
  const client = new MongoClient("mongodb+srv://nilesh_db_user:pVbvbizYi0GpI4hy@cluster1.ol8ez4d.mongodb.net/Tenant");
  await client.connect();
  const db = client.db("Tenant");
  const tenants = db.collection("tenants");
  await tenants.updateOne(
    { _id: new ObjectId("69f87aceea4ae71df66a5d12") },
    { $set: { apiKey: hashedKey } }
  );
  console.log(rawKey);
  await client.close();
}

run().catch(console.error);
