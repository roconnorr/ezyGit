import * as git from "isomorphic-git";
import { CommitDescriptionWithOid } from "isomorphic-git";
const fs = require("fs");

git.plugins.set("fs", fs);

const getGitLog = async (): Promise<Array<CommitDescriptionWithOid>> => {
  return await git.log({ dir: "/home/scott/repo/ezyGit/", depth: 10 });
};

export { getGitLog };
