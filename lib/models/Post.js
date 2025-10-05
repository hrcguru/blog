import { ObjectId } from "mongodb";
import { getDb } from "../mongodb";

export async function getPostById(id) {
  const db = await getDb();
  return db.collection("posts").findOne({ _id: new ObjectId(id) });
}

export async function addLike(id) {
  const db = await getDb();
  const result = await db
    .collection("posts")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { likes: 1 } },
      { returnDocument: "after" }
    );
  return result.value;
}

export async function addComment(id, comment) {
  const db = await getDb();
  const result = await db.collection("posts").findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $push: { comments: { ...comment, createdAt: new Date() } } },
    { returnDocument: "after" }
  );
  return result.value.comments;
}
