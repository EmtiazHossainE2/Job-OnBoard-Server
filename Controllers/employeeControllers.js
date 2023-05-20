const client = require('../Connection/connection');
const employeesDataCollection = client.db('jobOnboard').collection('employees');
const { ObjectId } = require('mongodb');

// Add new employe for company
const addEmployee = async (req, res) => {
  const employeData = req.body;
  const result = await employeesDataCollection.insertOne(employeData);
  res.send(result);
};

// Get all employe details from the database
const getEmployee = async (req, res) => {
  const getAllEmployeDetails = await employeesDataCollection.find({}).toArray();
  res.send(getAllEmployeDetails);
};

const userEmployees = async (req, res) => {
  const email = req.query.email;
  const decodedEmail = req.decoded.email;
  const query = { hrUserEmail: email };
  if (decodedEmail === email) {
    const hrAllEmployees = await employeesDataCollection.find(query).toArray();
    return res.send(hrAllEmployees);
  } else {
    return res.status(403).send({ message: 'forbidden access' });
  }
};

// Edit all employe details
const editEployee = async (req, res) => {
  const id = req.params.id;
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
// delete employe data
const deleteEmployeData = async (req, res) => {
  const deleteEmployeId = req.params.id;
  const findId = { _id: ObjectId(deleteEmployeId) };
  const deleteData = await employeesDataCollection.deleteOne(findId);
  res.send(deleteData);
};
const singleDetails = async (req, res) => {
  const id = req.params.detailsId;
  const query = { _id: ObjectId(id) };
  const result = await employeesDataCollection.findOne(query);
  res.send(result);
};

module.exports = {
  addEmployee,
  getEmployee,
  editEployee,
  deleteEmployeData,
  singleDetails,
  userEmployees,
};
