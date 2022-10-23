import { Provider as EthcallProvider, Call } from "ethcall";
import _ from "lodash";
import { BaseProvider } from "@ethersproject/providers";
import { MulticallInput, MulticallInputs, MulticallResultBase } from "./types";
import { ContractNamespace } from "../utils/constants/types";
import { transformEs6MapToArrays, transfromRecordToEs6Map } from "../utils";

export const doMulticall = async <R>(
  provider: BaseProvider,
  inputs: MulticallInputs<R>
) => {
  try {
    const ethcallProvider = new EthcallProvider();
    await ethcallProvider.init(provider);

    // use map for reproducable order
    const inputsMap = transfromRecordToEs6Map(inputs);

    const inputArr = transformEs6MapToArrays(inputsMap);

    const callsFlatten = _.flatten(
      _.map(inputArr, ({ contractMapper, callMappers, inputInfos }, index) =>
        _.flatten(
          _.map(inputInfos, ({ address }) => {
            const contract = contractMapper(address);
            return _.map(callMappers, (mapper) => mapper(contract));
          })
        )
      )
    );

    // aggregate all calls in chunk size of 30
    // TODO: see if this number need change
    const callsChunks = _.chunk(callsFlatten, 30);
    const results = await _.reduce(
      callsChunks,
      async (prev, calls) => {
        const prevResults = await prev;

        const res = await ethcallProvider.tryEach(calls, [
          ..._.map(calls, (call) => !call),
        ]);
        return [...prevResults, ...res];
      },
      Promise.resolve([] as any[])
    );

    let count = 0;
    const resultsNested = _.reduce(
      Object.entries(inputsMap),
      (prev, [key, input]) => {
        const records = _.reduce(
          (input as MulticallInput<R>).inputInfos,
          (prev2, inputInfo) => {
            const prevCount = count;
            const { callMappers, resultsMapper } = input;
            count += callMappers.length;
            const resultsLocal = results.slice(prevCount, count);
            return {
              ...prev2,
              [inputInfo.address]: {
                ...resultsMapper(inputInfo)(resultsLocal),
                ...inputInfo,
              },
            };
          },
          {} as Record<string, R & MulticallResultBase>
        );
        return {
          ...prev,
          [key]: records,
        };
      },
      {} as Record<ContractNamespace, Record<string, R & MulticallResultBase>>
    );
    return resultsNested;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
