import {
  simulateContract,
  ExecuteConfig,
  SimulateContractType as ContractType,
  SimulateInput,
  Tag,
} from "@three-em/node";

import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

const app: Express = express();
const port = process.env.PORT || 3000;
export type FunctionType = ContractType;
export type WriteInput = SimulateInput;
export type ExecutionConfig = ExecuteConfig;

export interface TestFunctionOpts {
  functionSource: Uint8Array;
  functionType: ContractType;
  functionInitState: any;
  writes: WriteInput[];
  gatewayConfig?: ExecutionConfig;
  settings?: Record<string, any> | undefined | null;
  exmContext?: any | undefined | null;
}

app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: false,
  }),
);
app.use(bodyParser.json({ limit: "200mb" }));

app.use(function (req, res, next) {
  req.setTimeout(500000, function () {});
  next();
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error("An error occurred:", err);
  res.status(500).json({ error: "An internal server error occurred." });
});

export const guidGenerator = () => {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

app.post("/", async (req: Request, res: Response) => {
  try {
    const { contractType, initState, input, contractSrc } = req.body;

    const buffer = new TextEncoder().encode(contractSrc);

    const memResult = await simulateContract({
      contractId: "",
      maybeContractSource: {
        contractType: contractType,
        //@ts-ignore
        contractSrc: buffer,
      },
      interactions: [
        {
          id: guidGenerator(),
          owner: "@test",
          quantity: "0",
          reward: "0",
          target: "none",
          tags: [],
          input: input,
        },
      ],
      contractInitState: initState,
    });
    const state = memResult.state;
    res.status(200).json({ state });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log("[⚡] Server started [⚡]"));
