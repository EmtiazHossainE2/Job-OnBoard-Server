const client = require("../Connection/connection");
const { ObjectId } = require("mongodb");
const applicantsCollection = client.db("jobOnboard").collection("applicants");

const newApplicant = async (req, res) => {
  const data = req.body;
  const result = await applicantsCollection.insertOne(data);
  res.send(result);
};
const viewCandidateResume = async (req, res) => {
  const id = req.params.resumeId;
  const query = { _id: ObjectId(id) };
  const result = await applicantsCollection.findOne(query);
  res.send(result);
};
const getApplicants = async (req, res) => {
  const applicants = await applicantsCollection.find({}).toArray();
  res.send(applicants);
};

const getOnlyApplicant = async (req, res) => {
  const email = req.query.email;
  const decodedEmail = req.decoded.email;
  const query = { email: email };
  if (decodedEmail === email) {
    const applicant = await applicantsCollection.find(query).toArray();
    return res.send(applicant);
  } else {
    return res.status(403).send({ message: "forbidden access" });
  }
};

const getApplicant = async (req, res) => {
  const email = req.query.email;
  const decodedEmail = req.decoded.email;
  const query = { hrEmail: email };
  if (decodedEmail === email) {
    const applicantsCount = await applicantsCollection.find(query).toArray();
    return res.send(applicantsCount);
  } else {
    return res.status(403).send({ message: "forbidden access" });
  }
};

const appliedJob = async (req, res) => {
  const filter = {
    $and: [
      { hrEmail: req.query.email },
      { createdDate: req.query.createdDate },
    ],
  };
  // console.log(filter);
  const result = await applicantsCollection.find(filter).toArray();
  return res.send(result);
};

const singleCandidates = async (req, res) => {
  const id = req.params.candidatesID;
  const query = { _id: ObjectId(id) };
  const result = await applicantsCollection.findOne(query);
  res.send(result);
};

const handleUpdateStatus = async (req, res) => {
  const id = req.query.id;
  const body = req.body;
  const filter = { _id: ObjectId(id) };
  const updatedDoc = {
    $set: body,
  };
  const updateStatus = await applicantsCollection.updateOne(filter, updatedDoc);
  res.send(updateStatus);
};

const deleteApplicantsData = async (req, res) => {
  const applicantID = req.params.id;
  const query = { _id: ObjectId(applicantID) };
  const deleteData = await applicantsCollection.deleteOne(query);
  res.send(deleteData);
};

module.exports = {
  getApplicant,
  newApplicant,
  getApplicants,
  getOnlyApplicant,
  appliedJob,
  singleCandidates,
  handleUpdateStatus,
  deleteApplicantsData,
  viewCandidateResume,
};
