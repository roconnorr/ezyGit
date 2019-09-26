import * as git from "isomorphic-git";
import { CommitDescriptionWithOid } from "isomorphic-git";
const fs = require("fs");
const chokidar = require('chokidar');
const home = ".";
const ignored = ["/(^|[\/\\])\../", 'node_modules', '.*'];
let watcher;


git.plugins.set("fs", fs);

const getGitLog = async (): Promise<Array<CommitDescriptionWithOid>> => {
  return await git.log({ dir: home, depth: 1000 });
};

const getCurrentBranch = async (): Promise<string | undefined> => {
  return await git.currentBranch({
    dir: home,
    fullname: true
  });
};

interface fileDiff {
  fullpath: string;
  A: string;
  B: string;
}

export interface fileChanges {
  originalState: string;
  newState: string;
}

async function startWatcher(){

   watcher = chokidar.watch(home, {
    ignored: ignored, // ignore dotfiles
    persistent: true
  }).on('all', (event:any, path: any) => {
    console.log(event, path);
    let status = git.status({ dir: home, filepath: path })
      console.log(status)
  });
  console.log("Watcher started.");
  return;
}

async function getChanges(diff: Array<fileDiff>): Promise<any> {
  const files = diff.map(async (diff: fileDiff) => {
    //console.log(diff);

    if (diff.A !== undefined) {
      var { object: blobA } = await git.readObject({
        dir: home,
        oid: diff.A,
        encoding: "utf8"
      });
    }

    if (diff.B !== undefined) {
      var { object: blobB } = await git.readObject({
        dir: home,
        oid: diff.B,
        encoding: "utf8"
      });
    }

    return {
      originalState: blobA ? blobA.toString() : "",
      newState: blobB ? blobB.toString() : ""
    };
  });
  // Make this an array of objects

  return await Promise.all(files);
}

const compareChanges = async (): Promise<Array<fileChanges>> => {
  // Use git log to get the SHA-1 object ids of the previous two commits
  const commits = await git.log({ dir: process.cwd(), depth: 3 });
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
      if (A.oid === B.oid) {
        return;
      }

      // Otherwise return the oids
      return {
        fullpath: A.fullpath,
        A: A.oid,
        B: B.oid
      };
    }
  });

  if (results == undefined || !results.length) {
    return [
      {
        originalState: "string",
        newState: "string"
      }
    ];
  }
  return await getChanges(results!);
};
export { getGitLog, getCurrentBranch, compareChanges, startWatcher };
