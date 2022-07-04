import {
  assertSpyCall,
  spy,
} from "https://deno.land/std@0.146.0/testing/mock.ts";
import { CustomTransformer, ListBlockChildrenResponseResult } from "./types.ts";
import { NotionToMarkdown } from "./mod.ts";

const fakeTransform: CustomTransformer = (
  block: ListBlockChildrenResponseResult
) => Promise.resolve(block.id);

Deno.test("blockToMarkdown sends parsing block to customTransformer", () => {
  const customTransformer = spy(fakeTransform);
  const n2m = new NotionToMarkdown({ notionClient: {} as any });
  n2m.setCustomTransformer("test", customTransformer);
  n2m.blockToMarkdown({
    id: "test",
    name: "test",
    type: "test",
    test: { foo: "bar" },
  } as any);
  assertSpyCall(customTransformer, 1);
});

Deno.test("supports only one customTransformer per type", () => {
  const customTransformerMock1 = spy(fakeTransform);
  const customTransformerMock2 = spy(fakeTransform);
  const n2m = new NotionToMarkdown({ notionClient: {} as any });
  n2m.setCustomTransformer("test", customTransformerMock1);
  n2m.setCustomTransformer("test", customTransformerMock2);
  n2m.blockToMarkdown({
    id: "test",
    name: "test",
    type: "test",
    test: { foo: "bar" },
  } as any);
  assertSpyCall(customTransformerMock1, 0);
  assertSpyCall(customTransformerMock2, 1);
});
