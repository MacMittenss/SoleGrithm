import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Redirect home to VITURE page
  app.get("/", (req, res) => {
    res.redirect("/viture");
  });

  // Serve the original VITURE HTML file
  app.get("/viture", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "viture-original.html"));
  });

  // Serve assets from the public/assets directory
  app.use("/assets", express.static(path.join(process.cwd(), "public", "assets")));

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
