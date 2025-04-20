const port = process.env.PORT || 3000;

const startListeningServer = (mainApp) =>
  mainApp.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

module.exports = { startListeningServer };