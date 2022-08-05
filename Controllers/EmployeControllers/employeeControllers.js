const client = require("../../Connection/connection");
const employeesDataCollection = client.db("jobOnboard").collection("employees");

// Add new employe for company
const addEmployee = async (req, res) => {
  const employeData = req.body;
  const result = await employeesDataCollection.insertOne(employeData);
  res.send(result);
};
// Get all employe details
const getEmployee = async (req, res) => {
  const getAllEmployeDetails = await employeesDataCollection.find({}).toArray();
  res.send(getAllEmployeDetails);
};
// Edit all employe details
const editEployee = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const employeDetails = req.body;
  const filter = { _id: ObjectId(id) };
  const option = { upsert: true };
  const updateDoc = {
    $set: employeDetails,
  };
  const results = await employeesDataCollection.updateOne(
    filter,
    updateDoc,
    option
  );
  res.send(results);
};

module.exports = {
  addEmployee,
  getEmployee,
  editEployee,
};
