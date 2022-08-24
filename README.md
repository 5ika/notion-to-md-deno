# Notion to Markdown for Deno

Convert notion pages, block and list of blocks to markdown (supports nesting) using [notion-sdk-js](https://github.com/makenotion/notion-sdk-js).

This projet is an adaptation of [notion-to-md](https://github.com/souvikinator/notion-to-md/) module for [Deno](https://deno.land/).
Credit goes to [notion-to-md](https://github.com/souvikinator/notion-to-md/) contributors.

## Usage

```typescript
import { Client } from "https://deno.land/x/notion_sdk@v1.0.4/src/mod.ts";
import { NotionToMarkdown } from "https://raw.githubusercontent.com/5ika/notion-to-md-deno/main/mod.ts";

const notion = new Client({auth: NOTION_SECRET});
const n2m = new NotionToMarkdown({
  notionClient: notion,
});

const mdblocks = await n2m.pageToMarkdown("target_page_id");
const mdString = n2m.toMarkdownString(mdblocks);

console.log(mdString);
```

See documentation on [notion-to-md project](https://github.com/souvikinator/notion-to-md/).
