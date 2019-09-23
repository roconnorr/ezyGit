import React from "react";
import { Label, Button } from "semantic-ui-react";
import { StatusResult } from "simple-git/typings/response";
import { stashChanges, popChanges } from "../git/git";

const Header = (status: StatusResult) => (
  <div>
    <Label>Branch: {status.current}</Label>
    <Label>Behind: {status.behind}</Label>
    <Label>Ahead: {status.ahead}</Label>
    <Button onClick={stashChanges}>Stash!</Button>
    <Button onClick={popChanges}>Pop!</Button>
  </div>
);

export default Header;
