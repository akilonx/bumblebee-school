// import * as Busboy from "busboy";
export const formatJSONResponse = ({
  statusCode,
  data,
  success,
  error,
}: {
  statusCode?: number;
  data?: any;
  success?: string;
  error?: string;
}) => {
  return {
    statusCode,
    success,
    error,
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};
