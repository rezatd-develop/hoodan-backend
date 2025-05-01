const port = 5001;

const startListeningServer = (mainApp) =>
  mainApp.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

module.exports = { startListeningServer };