const { ObjectId } = require("mongodb");
const client = require("../Connection/connection");
const taskCollection = client.db("jobOnboard").collection("tasks");


const giveCandidateTask = async (req, res) => {
  const taskInfo = req.body;
  const result = await taskCollection.insertOne(taskInfo);
  res.send(result);
};
const singleTask = async (req, res) => {
  const id = req.params.taskId;
  const query = { _id: ObjectId(id) };
  const result = await taskCollection.findOne(query);
  res.send(result);
};

const allreadyGiven = async (req, res) => {
  const email = req.query.email;
  const decodedEmail = req.decoded.email;
  const query = { hrEmail: email };
  if (decodedEmail === email) {
    const allreadyGiven = await taskCollection.find(query).toArray();
    return res.send(allreadyGiven);
  } else {
    return res.status(403).send({ message: "forbidden access" });
  }
};

const getJobTask = async (req, res) => {
  const email = req.query?.email;
  const decodedEmail = req.decoded?.email;
  const query = { candidateEmail: email };
  if (decodedEmail === email) {
    const hrTsak = await taskCollection.find(query).toArray();
    return res.send(hrTsak);
  } else {
    return res.status(403).send({ message: "forbidden access" });
  }
};

module.exports = {
  giveCandidateTask,
  singleTask,
  allreadyGiven,
  getJobTask,
};
