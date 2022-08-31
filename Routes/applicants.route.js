const router = require("express").Router();
const VerifyToken = require("../VerifyToken/VerifyToken");

const {
  getApplicant,
  newApplicant,
  getApplicants,
  getOnlyApplicant,
  appliedJob,
  singleCandidates,
  handleUpdateStatus,
  deleteApplicantsData
} = require("../Controllers/applicants.controller");

router.get("/", getApplicants);
router.get("/all/:candidatesID", VerifyToken, singleCandidates);
router.get("/applied", VerifyToken, getOnlyApplicant);
router.get("/show", VerifyToken, getApplicant);
router.get("/appliedCandidate", VerifyToken, appliedJob);
router.post("/", newApplicant);
router.patch("/status", VerifyToken, handleUpdateStatus);
router.delete("/all/:id", deleteApplicantsData);

module.exports = router;
