import { Client } from "https://deno.land/x/notion_sdk@v1.0.4/src/mod.ts";
import { ListBlockChildrenResponse } from "https://deno.land/x/notion_sdk@v1.0.4/src/api-endpoints.ts";
import { ListBlockChildrenResponseResults } from "../types.ts";

export const getBlockChildren = async (
  notionClient: Client,
  block_id: string,
  totalPage: number | null
) => {
  try {
    const result: ListBlockChildrenResponseResults = [];
    let pageCount = 0;
    let start_cursor = undefined;

    do {
      const response = (await notionClient.blocks.children.list({
        start_cursor: start_cursor,
        block_id: block_id,
      })) as ListBlockChildrenResponse;
      result.push(...response.results);

      start_cursor = response?.next_cursor;
      pageCount += 1;
    } while (
      start_cursor != null &&
      (totalPage == null || pageCount < totalPage)
    );

    modifyNumberedListObject(result);
    return result;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const modifyNumberedListObject = (
  blocks: ListBlockChildrenResponseResults
) => {
  let numberedListIndex = 0;

  for (const block of blocks) {
    if ("type" in block && block.type === "numbered_list_item") {
      // add numbers
      // @ts-ignore
      block.numbered_list_item.number = ++numberedListIndex;
    }
  }
};
