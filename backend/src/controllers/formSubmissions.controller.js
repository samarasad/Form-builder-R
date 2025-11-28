export const formSubmission = (req, res) => {
  try {
    res.status(200).json({ message: "Form submission successful" });
  } catch (error) {
    console.error("Error handling form submission:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};