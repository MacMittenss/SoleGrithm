import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve the SoleGrithm website as the main site
  app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
  });

  // Serve other SoleGrithm pages
  app.get("/about", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "about.html"));
  });

  app.get("/works", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "works.html"));
  });

  app.get("/contact", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "contact.html"));
  });

  // Serve the original VITURE HTML file for reference
  app.get("/viture", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "viture-original.html"));
  });

  // Serve all static assets (CSS, JS, Images)
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
