import * as git from "isomorphic-git";
import { CommitDescriptionWithOid } from "isomorphic-git";
const fs = require("fs");
var diff = require("diff-lines");

git.plugins.set("fs", fs);

const getGitLog = async (): Promise<Array<CommitDescriptionWithOid>> => {
  return await git.log({ dir: "./", depth: 10 });
};

const getCurrentBranch = async (): Promise<string | undefined> => {
  return await git.currentBranch({
    dir: "./",
    fullname: true
  });
};

interface fileDiff {
  fullpath: string;
  A: string;
  B: string;
}

const compareChanges = async (): Promise<Array<string>> => {
  // Use git log to get the SHA-1 object ids of the previous two commits
  const commits = await git.log({ dir: process.cwd(), depth: 2 });
  const oids = commits.map(commit => commit.oid);

  // Make TREE objects for the first and last commits
  const A = git.TREE({ fs, gitdir: `${process.cwd()}/.git`, ref: oids[0] });
  const B = git.TREE({
    fs,
    gitdir: `${process.cwd()}/.git`,
    ref: oids[oids.length - 1]
  });

  // Get a list of the files that changed
  let results = await git.walkBeta1<any, Array<fileDiff>>({
    trees: [A, B],
    map: async function([A, B]) {
      // Ignore directories
      if (A.fullpath === ".") {
        return;
      }

      await A.populateStat();
      if (A.type === "tree") {
        return;
      }

      await B.populateStat();
      if (B.type === "tree") {
        return;
      }

      // Figure out the SHA-1 object ids.
      await A.populateHash();
      await B.populateHash();

      // Skip pairs where the oids are the same
      if (A.oid === B.oid) return;

      // Otherwise return the oids
      return {
        fullpath: A.fullpath,
        A: A.oid,
        B: B.oid
      };
    }
  });

  const oidA = results![0].A;

  const { object: blobA } = await git.readObject({
    dir: "./",
    oid: oidA,
    encoding: "utf8"
  });

  const oidB = results![0].B;
  const { object: blobB } = await git.readObject({
    dir: "./",
    oid: oidB,
    encoding: "utf8"
  });

  console.log(diff(blobA, blobB, { n_surrounding: 4 }));
  return [blobA.toString(), blobB.toString()];
  // return diff(blobA, blobB, { n_surrounding: 4 });
};
export { getGitLog, getCurrentBranch, compareChanges };
