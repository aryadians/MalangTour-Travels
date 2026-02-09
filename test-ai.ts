import { generalChat } from "./actions/ai";

async function testChat() {
  console.log("Testing generalChat...");
  const response = await generalChat("Halo, apa kabar?");
  console.log("Response:", JSON.stringify(response, null, 2));
}

testChat().catch(console.error);
