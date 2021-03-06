const express = require("express");
const { authUser } = require("../basicAuth");
const router = express.Router();
const { projects } = require("../data");
const { canViewProject, scoopedProjects } = require("../permissions/project");

router.get("/", authUser, (req, res) => {
  res.json(scoopedProjects(req.user, projects));
});

router.get("/:projectId", setProject, authUser, authGetProject, (req, res) => {
  res.json(req.project);
});

function setProject(req, res, next) {
  const projectId = parseInt(req.params.projectId);
  req.project = projects.find((project) => project.id === projectId);

  if (req.project == null) {
    return res.status(404).send("Project not found");
  }
  next();
}

function authGetProject(req, res, next) {
  if (!canViewProject(req.user, req.project)) {
    res.status(403).send(`Unauthorized..`);
  }
  next();
}

module.exports = router;
