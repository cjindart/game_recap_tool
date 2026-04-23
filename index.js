import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// parsing arguments to get sport pasted
const sportIndex = process.argv.indexOf('--sport');                                                                                      
const sport = sportIndex !== -1 ? process.argv[sportIndex + 1] : 'basketball';

// asking user to input stats
console.log("Paste stats below, then press Ctrl+D:")
const chunks = [];
for await (const chunk of process.stdin) {
  chunks.push(chunk);
}                                                                                                                                        
const stats = Buffer.concat(chunks).toString("utf8").trim();

// stream() is like create(), but instead of waiting for the whole response,
// it fires a "text" event for each token as Claude generates it.
// added try catch to catch errors with api overload or incorrect key
try { const stream = client.messages.stream({
  system: `You are an energetic sports broadcaster, a combination of the best theres ever been. You are taking in statistics from a sports game and outputting a clear and engaging highlight script of the game. Use plain text only, no **bold**, no ## headers, no emoji. Make the length roughly 150-200 words, as one continuous spoken script, not sections. In this case, you are covering ${sport}`, 
  messages: [                                                                                                                              
    { role: "user", content: `Here are the game stats:\n\n${stats}`}
  ], 
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
});

// This fires once per token — notice numbers appear one at a time
stream.on("text", (delta) => {
  process.stdout.write(delta);
});

// finalMessage() waits for the stream to finish and returns
// the full Message object (same shape as what create() returns)
const finalMessage = await stream.finalMessage();

console.log("\n\nDone. Stop reason:", finalMessage.stop_reason);
console.log("Tokens used:", finalMessage.usage.output_tokens);

// error catching 
} catch (error) {
  if (error instanceof Anthropic.APIError && error.error?.error?.type === "overloaded_error") {
    console.error("API is overloaded — try again in a moment.");
  } else if (error instanceof Anthropic.AuthenticationError) {
    console.error("Invalid API key — check your .env file.");
  } else {
    console.error("Something went wrong:", error.message);
  }
}