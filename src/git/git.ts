import * as git from "isomorphic-git";
import { CommitDescriptionWithOid } from "isomorphic-git";
const fs = require("fs");

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
export { getGitLog, getCurrentBranch };
