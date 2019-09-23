import simplegit, { StatusResult } from "simple-git/promise";
const git = simplegit();

async function cloneRepo(repo: string, user: string, pass: string) {
  const remote = `https://${user}:${pass}@${repo}`;

  await git
    .silent(true)
    .clone(remote)
    .then(() => console.log("finished"))
    .catch((err: any) => console.error("failed: ", err));
}

async function getStatus(workingDir: string): Promise<StatusResult> {
  const git = require("simple-git/promise");
  let statusSummary: StatusResult;

  //   try {
  statusSummary = await git(workingDir).status();
  //   } catch (e) {
  //     // handle the error
  //   }
  console.log(statusSummary);
  return statusSummary;
}

export { cloneRepo, getStatus };
