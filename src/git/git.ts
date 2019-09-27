import * as git from "isomorphic-git";
import { CommitDescriptionWithOid } from "isomorphic-git";
import {startWatcher} from "./watcher"
import { async } from "q";
const fs = require("fs");
const home = "./";


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
  fileName: string;
}

async function readFile(
  oid: string,
  encoding: string = "utf8"
): Promise<string> {
  const { object: blob } = await git.readObject({
    dir: home,
    oid,
    encoding
  });

  return blob.toString();
}

async function getChanges(diff: Array<fileDiff>): Promise<any> {
  const files = diff.map(async (diff: fileDiff) => {
    const result = {
      originalState: "",
      newState: "",
      fileName: diff.fullpath
    };

    if (diff.A !== undefined) {
      result.originalState = await readFile(diff.A);
    }

    if (diff.B !== undefined) {
      result.newState = await readFile(diff.B);
    }

    return result;
  });
  return await Promise.all(files);
}

// This is potentially a worse implementation of the getFileStateChanges function
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
        originalState: "",
        newState: "",
        fileName: ""
      }
    ];
  }
  return await getChanges(results!);
};

async function getGitStatus(): Promise<any> {
  let status = await git.statusMatrix({ dir: home, pattern: "**" });

  const FILE = 0,
    HEAD = 1,
    WORKDIR = 2,
    STAGE = 3;

  const deleted = await status
    .filter(row => row[WORKDIR] === 0)
    .map(row => row[FILE]);

  const unstaged = await status
    .filter(row => row[WORKDIR] !== row[STAGE])
    .map(row => row[FILE]);

  const modified = await status
    .filter(row => row[HEAD] !== row[WORKDIR])
    .map(row => row[FILE]);

    startWatcher();

  return unstaged;
}

async function getModifiedFiles(): Promise<any> {
  const filesEdited = await getGitStatus();

  return filesEdited;
}

async function addAllUntrackedFiles(): Promise<any> {
  const globby = require("globby");
  const paths = await globby([home +"**", home+ "**/.*"], { gitignore: true });
  for (const filepath of paths) {
    await git.add({ fs, dir: home, filepath });
  }
}

/**
 * To test and compare to the other solution i'm using
 * @param commitHash1
 * @param commitHash2
 * @param dir
 */
async function getFileStateChanges(
  commitHash1: string,
  commitHash2: string,
  dir: string
) {
  return git.walkBeta1({
    trees: [
      git.TREE({ fs, gitdir: dir, ref: commitHash1 }),
      git.TREE({ fs, gitdir: dir, ref: commitHash2 })
    ],
    map: async function([A, B]) {
      // ignore directories
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

      // generate ids
      await A.populateHash();
      await B.populateHash();

      // determine modification type
      let type = "equal";
      if (A.oid !== B.oid) {
        type = "modify";
      }
      if (A.oid === undefined) {
        type = "add";
      }
      if (B.oid === undefined) {
        type = "remove";
      }
      if (A.oid === undefined && B.oid === undefined) {
        console.log("Something weird happened:");
        console.log(A);
        console.log(B);
      }

      return {
        path: `/${A.fullpath}`,
        type: type
      };
    }
  });
}

export { getGitLog, getCurrentBranch, compareChanges, getModifiedFiles };
