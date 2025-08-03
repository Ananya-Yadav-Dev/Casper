import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

router.post("/test", async (req, res) => {
  try {
    let newThread = new Thread({
      threadId: "cdij",
    });
    const data = await newThread.save();
    console.log(data);
    res.send(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
});

router.get("/threads", async (req, res) => {
  try {
    const threads = await Thread.find().sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get threads", error: err.message });
  }
});

router.get("/threads/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }
    res.json(thread);
  } catch (err) {
    res.status(500).json({ message: "Thread not found", error: err.message });
  }
});

router.delete("/threads/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });
    if (!deletedThread) {
      return res.status(404).json({ message: "Thread not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete", error: err.message });
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }
    const assistantReply = await getOpenAIAPIResponse(message);
    if (!assistantReply) {
      return res.status(500).json({ error: "OpenAI returned no response" });
    }

    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();
    await thread.save();
    res.json({ reply: assistantReply });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
