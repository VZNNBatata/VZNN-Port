import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "data");

export async function ensureStore() { await fs.mkdir(dataDir, { recursive: true }); }
export async function readData(name, fallback) {
  await ensureStore();
  const file = path.join(dataDir, `${name}.json`);
  try { return JSON.parse(await fs.readFile(file, "utf8")); }
  catch (error) {
    if (error.code !== "ENOENT") throw error;
    await writeData(name, fallback);
    return structuredClone(fallback);
  }
}
export async function writeData(name, value) {
  await ensureStore();
  const file = path.join(dataDir, `${name}.json`);
  const temp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(temp, JSON.stringify(value, null, 2));
  await fs.rename(temp, file);
  return value;
}
export const makeId = () => crypto.randomUUID();
