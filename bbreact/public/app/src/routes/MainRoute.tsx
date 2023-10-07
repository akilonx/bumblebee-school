import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { CognitoProps } from "../App";
import { Path } from "../shared/components/Breadcrumb";
import { ErrorNotFound } from "../shared/components/ErrorNotFound";
import Loading from "../shared/components/Loading";
import { Logout } from "../shared/components/Logout";

const Student = React.lazy(() => import("../pages/Student"));

export interface BreadcrumbProps {
  baseBreadcrumb: Path[];
  baseUrl: string;
}

interface Props extends CognitoProps {}

const MainRoute: React.FC<Props> = (props: Props) => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/logout" element={<Logout {...props} />} />
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MainRoute;
