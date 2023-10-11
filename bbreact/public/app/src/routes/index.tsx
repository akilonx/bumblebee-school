import React from "react";
import PathConstants from "./pathConstants";

const CreateStudent = React.lazy(
  () => import("../pages/students/CreateStudent")
);
const Students = React.lazy(() => import("../pages/students/Students"));

const routes = [
  { path: PathConstants.HOME, element: <Students /> },
  { path: PathConstants.STUDENTS, element: <Students /> },
  { path: PathConstants.CREATE_STUDENT, element: <CreateStudent /> },
];

export default routes;
