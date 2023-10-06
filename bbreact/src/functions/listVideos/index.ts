import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/apiGateway";
import { VideoRecord } from "src/types/dynamo";
import Dynamo from "@libs/Dynamo";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const playlistSermonId = "PLhhAnyzArR1e5QeMe9raZLisRfNXxblHk";

    const playlistServiceId = "PLhhAnyzArR1cx3OGUMSALMmWEYvYggHdY";

    const sermons = await Dynamo.query<VideoRecord>({
      index: "index1",
      tableName: tableName,
      pkKey: "pk",
      pkValue: `video#${playlistSermonId}`,
      limit: 25,
      scanIndexForward: false,
    });

    const services = await Dynamo.query<VideoRecord>({
      index: "index1",
      tableName: tableName,
      pkKey: "pk",
      pkValue: `video#${playlistServiceId}`,
      limit: 25,
      scanIndexForward: false,
    });

    if (!sermons) {
      return formatJSONResponse({
        statusCode: 404,
        data: { message: "No data " },
      });
    }
    var ONE_HOUR = 60 * 60 * 1000;

    const isLive = (video: VideoRecord) =>
      +new Date() - +new Date(video.liveStreamingStartTime) < ONE_HOUR &&
      video.liveStreamingStartTime;

    const sermonVideos = sermons
      .map(({ pk, sk, description, ...rest }) => rest)
      .slice(0, 20);

    const serviceVideos = services
      /* .filter(
        (video) =>
          !video.liveStreamingStartTime || !!video.liveStreamingActualEndTime
      ) */
      .map(({ pk, sk, description, ...rest }) => rest)
      .slice(0, 20);

    const liveService = services
      .filter(isLive)
      .map(({ pk, sk, description, ...rest }) => rest)
      .slice(0, 1);

    return formatJSONResponse({
      statusCode: 200,
      data: {
        liveStreaming: liveService,
        sundaySermons: sermonVideos,
        praiseWorship: serviceVideos,
        message: "Success",
      },
    });
  } catch (error) {
    console.log("error", error);
    return;
  }
};
