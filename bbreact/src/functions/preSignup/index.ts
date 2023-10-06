import Dynamo from "@libs/Dynamo";
import { PreSignUpTriggerEvent } from "aws-lambda";
import { UserRecord } from "src/types/dynamo";

export const handler = async (
  event: PreSignUpTriggerEvent,
  context,
  callback
) => {
  try {
    const tableName = process.env.singleTable;

    //   version: '1',
    //   region: 'us-east-1',
    //   userPoolId: 'us-east-1_aRBw78DqX',
    //   userName: 'a4889418-0041-70e1-75b0-82d66a5888ce',
    //   callerContext: {
    //     awsSdkVersion: 'aws-sdk-unknown-unknown',
    //     clientId: '52l89ahdt16uqsj0aa8bmji37n'
    //   },
    //   triggerSource: 'PreSignUp_SignUp',
    //   request: {
    //     userAttributes: { email: 'akilon.krishnan@gmail.com' },
    //     validationData: null
    //   },
    //   response: {
    //     autoConfirmUser: false,
    //     autoVerifyEmail: false,
    //     autoVerifyPhone: false
    //   }
    // }
    // aws_user_pools_id: "us-east-1_0vhc6cRbi",
    // aws_user_pools_web_client_id: "78ui9jltd7f5fh5184im51t3f",

    const data: UserRecord = {
      id: event.userName,
      pk: `user#`, //user#${residenceId}
      sk: `new#`, //homeaddress#${streetName}#${houseNo} // new# for first time user
      email: event.request.userAttributes.email,
      name: "",
      houseNo: "",
      streetName: "",
      mobile: "",
      mobileExtra: "",
      phone: "",
      createdAt: new Date().toISOString(),
      avatar: "",
      residenceId: "",
      active: "true",
      updatedAt: "",
    };

    await Dynamo.write({ data, tableName });

    console.log(event);
    callback(null, event);
  } catch (error) {
    console.log("error", error);
    return;
  }
};
