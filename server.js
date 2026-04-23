import express from "express";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
const client = new Anthropic();

app.use(express.static("public"));
app.use(express.json());

app.post("/recap", async (req, res) => {
    const { stats, sport } = req.body;

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    const stream = client.messages.stream({
        system: `You are an energetic sports broadcaster, a combination of the best theres ever been. 
        You are taking in statistics from a sports game and outputting a clear and engaging highlight 
        script of the game. Use plain text only, no **bold**, no ## headers, no emoji. Make the length 
        roughly 220 words, structured as exactly three paragraphs separated by a blank line. No more, 
        no less. In this case, you are covering ${sport}`,
        messages: [
            { role: "user", content: `Here are the game stats:\n\n${stats}` }
        ],
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
    });

    stream.on("text", (delta) => {
        res.write(delta);
    });

    await stream.finalMessage();
    res.end();
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});