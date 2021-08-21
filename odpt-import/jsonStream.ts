import {iter} from "https://deno.land/std@0.110.0/io/util.ts";

export async function* streamingFileParser(filepath: string): AsyncGenerator<string, void> {
  const file = await Deno.open(filepath);
  yield* jsonStream(iter(file))
  file.close();
}

export async function* streamingFetchParser(
  input: Request | URL | string,
  init?: RequestInit,
  cacheFilepath?: string
): AsyncGenerator<string, void> {
  const res = await fetch(input, init);
  if (res.body == null) {
    throw new Error("Body is null")
  }
  if (cacheFilepath){
    const cacheFile = await Deno.open(cacheFilepath, {write: true, createNew: true})
    yield* jsonStream(saveToFileStream(res.body, cacheFile))
    cacheFile.close()
  } else {
    yield* jsonStream(res.body)
  }
}

export async function* saveToFileStream(it: AsyncIterable<Uint8Array>, f: Deno.File): AsyncGenerator<Uint8Array, void> {
  for await (const buffer of it) {
    await f.write(buffer)
    yield buffer
  }
}

export async function* jsonStream(it: AsyncIterable<Uint8Array>): AsyncGenerator<string, void> {
  let openBraceCount = 0;
  let tempUint8Array: number[] = [];
  const decoder = new TextDecoder();
  for await (const buffer of it) {
    for (let i = 0, len = buffer.length; i < len; i++) {
      const uint8 = buffer[i];

      //open brace
      if (uint8 === 123) {
        if (openBraceCount === 0) tempUint8Array = [];
        openBraceCount++;
      }

      tempUint8Array.push(uint8);

      //close brace
      if (uint8 === 125) {
        openBraceCount--;
        if (openBraceCount === 0) {
          const uint8Ary = new Uint8Array(tempUint8Array);
          yield decoder.decode(uint8Ary);
        }
      }
    }
  }
}