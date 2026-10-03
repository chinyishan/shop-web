/**
 * 冒煙測試：啟動 build 後的伺服器，逐一請求主要路由，
 * 檢查 HTTP 狀態碼、SSR 是否成功，以及頁面上應出現的關鍵文字。
 *
 * 用法：npm run build && npm run test:smoke
 * 加上 --snapshot 會把結果寫到 tests/smoke/baseline.json 作為比對基準。
 */
import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.SMOKE_PORT ?? 3199);
const BASE = `http://localhost:${PORT}`;
const BASELINE = fileURLToPath(new URL("./baseline.json", import.meta.url));

/** [路徑, 預期狀態碼, 頁面上應出現的文字] */
const ROUTES = [
  ["/", 200, "系列品牌"],
  ["/brands/1", 200, "森林綠萃"],
  ["/brands/preview/1", 200, "森林綠萃"],
  ["/products/1/detail", 200, "綜合維他命 B 群緩釋錠"],
  ["/products/1/detail?category=reviews", 200, ""],
  ["/products/1/product/101", 200, "綜合維他命 B 群緩釋錠"],
  ["/products/1/product/preview/101", 200, "綜合維他命 B 群緩釋錠"],
  ["/products/1/preview/reviews", 200, ""],
  ["/articles/all", 200, "維他命 B 群什麼時候吃最有感"],
  ["/articles/all/1", 200, "維他命 B 群什麼時候吃最有感"],
  ["/articles/article/preview/1", 200, "維他命 B 群什麼時候吃最有感"],
  ["/qualities/1", 200, ""],
  ["/qualities/preview/1", 200, ""],
  ["/contact-us/questions", 200, "保健食品可以和藥物一起吃嗎"],
  ["/contact-us/information", 200, ""],
  ["/cart", 200, ""],
  ["/checkout", 200, ""],
  ["/checkout/complete", 200, ""],
  ["/compare", 200, ""],
  ["/wishlist", 200, ""],
  ["/orders", 200, ""],
  ["/search?keyword=魚油", 200, ""],
  ["/quiz", 200, ""],
  ["/products/1/product/999999", 404, ""],
  ["/not-a-real-page", 404, ""],
  ["/brands/999", 404, ""],
  ["/articles/all/999", 404, ""],
  ["/product/1/101", 302, ""],
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function startServer() {
  const server = spawn(process.execPath, [".output/server/index.mjs"], {
    env: { ...process.env, PORT: String(PORT), NITRO_PORT: String(PORT) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stderr = "";
  server.stderr.on("data", (d) => (stderr += d));

  for (let i = 0; i < 50; i++) {
    try {
      await fetch(`${BASE}/api/system/config`);
      return { server, getStderr: () => stderr };
    } catch {
      await wait(200);
    }
  }
  server.kill();
  throw new Error(`伺服器沒有在時間內啟動\n${stderr}`);
}

const pickTitle = (html) => html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";

async function run() {
  const snapshot = process.argv.includes("--snapshot");
  const { server, getStderr } = await startServer();
  const results = {};
  let failed = 0;

  try {
    for (const [path, status, text] of ROUTES) {
      const res = await fetch(`${BASE}${encodeURI(path)}`, {
        redirect: "manual",
        headers: { accept: "text/html" },
      });
      const html = await res.text();
      const problems = [];

      if (res.status !== status) problems.push(`狀態碼 ${res.status}，預期 ${status}`);
      if (status === 200 && !html.includes('id="__nuxt"')) problems.push("沒有 SSR 輸出");
      if (text && !html.includes(text)) problems.push(`找不到文字「${text}」`);

      results[path] = { status: res.status, title: pickTitle(html) };
      if (problems.length) failed++;
      console.log(`${problems.length ? "✗" : "✓"} ${res.status} ${path}${problems.length ? `  ← ${problems.join("；")}` : ""}`);
    }
  } finally {
    server.kill();
  }

  const serverErrors = getStderr().trim();
  if (serverErrors) {
    console.log(`\n伺服器 stderr：\n${serverErrors}`);
  }

  if (snapshot) {
    await writeFile(BASELINE, `${JSON.stringify(results, null, 2)}\n`);
    console.log(`\n已寫入基準：${BASELINE}`);
  } else {
    const baseline = JSON.parse(await readFile(BASELINE, "utf8").catch(() => "{}"));
    for (const [path, { title }] of Object.entries(results)) {
      const before = baseline[path]?.title;
      if (before !== undefined && before !== title) {
        console.log(`! 標題改變 ${path}：「${before}」→「${title}」`);
      }
    }
  }

  console.log(`\n${ROUTES.length - failed}/${ROUTES.length} 通過`);
  process.exit(failed ? 1 : 0);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
