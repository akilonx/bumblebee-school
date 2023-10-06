interface APIGatewayResponse {
  body: string;
  statusCode: number;
  headers?: { [key: string]: string };
}

export const formatJSONResponse = ({
  body,
  statusCode = 200,
  headers,
}: {
  body: any;
  statusCode?: number;
  headers?: { [key: string]: string };
}) =>
  ({
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
      ...headers,
    },
    statusCode,
    body: JSON.stringify(body),
  } as APIGatewayResponse);

export function removePkSk<T>(
  record: T | T[]
): undefined | Omit<T, "pk" | "sk"> | Omit<T, "pk" | "sk">[] {
  if (Array.isArray(record)) {
    return record.map((r) => {
      const { pk, sk, ...rest } = r as any;
      return rest;
    });
  }
  if (!record) {
    return undefined;
  }
  const { pk, sk, ...rest } = record as any;
  return rest;
}
