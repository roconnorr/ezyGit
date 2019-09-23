var Git = require("nodegit");

const clone = () => {
  Git.Clone("https://github.com/nodegit/nodegit", "nodegit").then(function(
    repository
  ) {
    // Work with the repository object here.
  });
};

const openRepo = () => {
  var getMostRecentCommit = function(repository) {
    return repository.getBranchCommit("master");
  };

  var getCommitMessage = function(commit) {
    return commit.message();
  };

  Git.Repository.open("nodegit")
    .then(getMostRecentCommit)
    .then(getCommitMessage)
    .then(function(message) {
      console.log(message);
    });
};

const history = () => {
  // Open the repository directory.
  Git.Repository.open("tmp")
    // Open the master branch.
    .then(function(repo) {
      return repo.getMasterCommit();
    })
    // Display information about commits on master.
    .then(function(firstCommitOnMaster) {
      // Create a new history event emitter.
      var history = firstCommitOnMaster.history();

      // Create a counter to only show up to 9 entries.
      var count = 0;

      // Listen for commit events from the history.
      history.on("commit", function(commit) {
        // Disregard commits past 9.
        if (++count >= 9) {
          return;
        }

        // Show the commit sha.
        console.log("commit " + commit.sha());

        // Store the author object.
        var author = commit.author();

        // Display author information.
        console.log("Author:\t" + author.name() + " <" + author.email() + ">");

        // Show the commit date.
        console.log("Date:\t" + commit.date());

        // Give some space and show the message.
        console.log("\n    " + commit.message());
      });

      // Start emitting events.
      history.start();
    });
};

export { clone, history };
