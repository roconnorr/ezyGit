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

async function getStatus(): Promise<StatusResult> {
  return await git.status();
}

async function stashChanges(): Promise<string> {
  return await git.stash();
}

async function popChanges(): Promise<string> {
  return await git.stash(["pop"]);
}

export { cloneRepo, getStatus, stashChanges, popChanges };
