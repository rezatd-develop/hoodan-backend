const port = 5000;

const startListeningServer = (mainApp) =>
  mainApp.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

module.exports = { startListeningServer };