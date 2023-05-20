const client = require("../Connection/connection");
const { ObjectId } = require("mongodb");

//collections
const jobsCollection = client.db("jobOnboard").collection("jobs");


//Get All Job form the database
const allJob = async (req, res) => {

  const { search, location, cat, salary, type } = req.query;
  const page = req.query?.page || 1;
  const show = req.query?.show || 10;

  // http://localhost:5000/jobs?search=react&page=1&show=10&location=Remote&cat=%27%27&salary=%27%27

  const searchExpQuery = new RegExp(search, 'i');
  const locationRegExp = new RegExp(location, 'i');
  const categoryRegExp = new RegExp(cat, 'i');
  const typeRegExp = new RegExp(type, 'i');
  const jobType = type?.split(',')


  let jobTypeObj = {}

  // For Check Length Job Type
  if (jobType?.length > 1) {
    jobTypeObj = { jobType: { $in: [...jobType] } }
  }

  else {
    jobTypeObj = { jobType: { $regex: typeRegExp } }
  }


  //Filter regex mongodb
  let filter =
  {
    "$and":
      [
        { jobTitle: { $regex: searchExpQuery } },
        { location: { $regex: locationRegExp } },
        jobTypeObj,
        { category: { $regex: categoryRegExp } },
      ]
  }

  const jobs = await jobsCollection.find(filter).sort({createdDate:-1}).skip(eval((page - 1) * show)).limit(eval(show)).toArray();

  const count = await jobsCollection.countDocuments()
  return res.send({ jobs: jobs, total: count });

};

// Get Jobs 
const getOnlyJobs = async (req, res) => {
  const email = req.query.email;
  const decodedEmail = req.decoded.email;
  const query = { hrEmail: email };
  if (decodedEmail === email) {
    const hrJobs = await jobsCollection.find(query).toArray();
    return res.send(hrJobs);
  } else {
    return res.status(403).send({ message: "forbidden access" });
  }
};


//Single job
const singleJob = async (req, res) => {
  const { jobId } = req.params;
  const job = await jobsCollection.findOne({ _id: ObjectId(jobId) });
  res.json(job);
};

//Single job
const getAllJobs = async (req, res) => {
  const result = await jobsCollection.find({}).toArray();
  if (result) {
    res.send({ success: true, result });
  } else {
    res.status(403).send({ success: false, message: "Forbidden request" });
  }
};

//Add New Job
const addNewJob = async (req, res) => {
  const data = req.body;
  const result = await jobsCollection.insertOne(data);
  res.send(result);
}


//Delete  Job
const deleteJob = async (req, res) => {
  const id = req.params.id
  const query = { _id: ObjectId(id) }
  const result = await jobsCollection.deleteOne(query)
  res.send(result);
}

//Update  Job
const updateJob = async (req, res) => {
  const id = req.params.id
  const updateInfo = req.body
  const filter = { _id: ObjectId(id) }
  const options = { upsert: true };
  const updateDoc = {
    $set: updateInfo
  };
  const result = await jobsCollection.updateOne(filter, updateDoc, options);
  res.send(result)
}



module.exports = {
  getAllJobs,
  allJob,
  singleJob,
  addNewJob,
  getOnlyJobs,
  deleteJob,
  updateJob
};
