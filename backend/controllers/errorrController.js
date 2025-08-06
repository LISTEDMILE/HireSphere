exports.errorr = (req, res, next) => {
  res.status(404).render("errorr/errorr", { active: "errorr", title: "Error" });
};
