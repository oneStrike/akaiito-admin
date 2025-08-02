import { dictionaryItemsApi } from '#/apis';

export const useDataDict = async (codes: string) => {
  await dictionaryItemsApi({
    dictionaryCode: codes,
  });
};
