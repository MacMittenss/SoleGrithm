import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve all static assets (CSS, JS, Images) for backwards compatibility
  app.use("/css", express.static(path.join(process.cwd(), "public", "css")));
  app.use("/js", express.static(path.join(process.cwd(), "public", "js")));
  app.use("/images", express.static(path.join(process.cwd(), "public", "images")));
  app.use("/utilties", express.static(path.join(process.cwd(), "public", "utilties")));
  app.use("/assets", express.static(path.join(process.cwd(), "public", "assets")));

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
