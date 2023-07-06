const validatePostFields = (req, res, next) => {
  const { title, description, url } = req.body;
  const emptyRegex = /^\s*$/;
  const urlRegex = /^(https?:\/\/|http?:\/\/)/;

  if (emptyRegex.test(title) || emptyRegex.test(description)) {
    res.status(400).json({ message: "Title or description cannot be empty" });
  } else if (!urlRegex.test(url)) {
    res.status(400).json({ message: "Invalid URL format" });
  } else {
    next();
  }
};

module.exports = {
  validatePostFields,
};
