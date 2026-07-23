import "dotenv/config";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import multer from "multer";
import { createToken, requireAdmin, verifyCredentials } from "./auth.js";
import { makeId, readData, writeData } from "./store.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const uploads = path.join(here, "uploads");
fs.mkdirSync(uploads, { recursive: true });

for (const key of ["JWT_SECRET", "ADMIN_EMAIL", "ADMIN_PASSWORD"]) {
  if (!process.env[key]) { console.error(`Missing ${key}. Copy .env.example to .env and configure it.`); process.exit(1); }
}

const app = express();
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(",").map(s=>s.trim()) || true }));
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(uploads, { maxAge: "7d" }));

const storage = multer.diskStorage({
  destination: uploads,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace(/[^.a-z0-9]/g, "") || ".bin";
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2,10)}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024 }, fileFilter: (_req,file,cb)=>cb(null,/^(image|video)\//.test(file.mimetype)) });

const protectAllQuery = (req, res, next) => {
  if (req.query.all === "1") return requireAdmin(req, res, next);
  next();
};

app.post("/api/auth/login", async (req,res) => {
  const { email="", password="" } = req.body || {};
  if (!verifyCredentials(email,password)) return res.status(401).json({ message: "Invalid email or password" });
  res.json({ token: createToken() });
});
app.get("/api/auth/me", requireAdmin, (req,res) => res.json({ email:req.user.email, role:"admin" }));
app.post("/api/upload", requireAdmin, upload.single("file"), (req,res) => {
  if (!req.file) return res.status(400).json({ message: "No valid file uploaded" });
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

app.get("/api/settings", async (_req,res,next)=>{try{res.json(await readData("settings",{}))}catch(e){next(e)}});
app.put("/api/settings", requireAdmin, async (req,res,next)=>{try{res.json(await writeData("settings", req.body || {}))}catch(e){next(e)}});

app.get("/api/categories", protectAllQuery, async (req,res,next)=>{try{let rows=await readData("categories",[]);if(req.query.all!=="1")rows=rows.filter(x=>x.visible!==false);res.json(rows.sort((a,b)=>(a.displayOrder||0)-(b.displayOrder||0)))}catch(e){next(e)}});
app.post("/api/categories", requireAdmin, async (req,res,next)=>{try{const rows=await readData("categories",[]);const row={id:makeId(),name:"New Category",slug:`category-${Date.now()}`,visible:true,displayOrder:rows.length+1,...req.body};rows.push(row);await writeData("categories",rows);res.status(201).json(row)}catch(e){next(e)}});
app.put("/api/categories/:id", requireAdmin, async (req,res,next)=>{try{const rows=await readData("categories",[]);const i=rows.findIndex(x=>x.id===req.params.id);if(i<0)return res.status(404).json({message:"Category not found"});rows[i]={...rows[i],...req.body,id:rows[i].id};await writeData("categories",rows);res.json(rows[i])}catch(e){next(e)}});
app.delete("/api/categories/:id", requireAdmin, async (req,res,next)=>{try{const rows=await readData("categories",[]);await writeData("categories",rows.filter(x=>x.id!==req.params.id));res.status(204).end()}catch(e){next(e)}});

app.get("/api/projects", protectAllQuery, async (req,res,next)=>{try{let rows=await readData("projects",[]);if(req.query.all!=="1")rows=rows.filter(x=>x.visible!==false);res.json(rows.sort((a,b)=>(a.displayOrder||0)-(b.displayOrder||0)))}catch(e){next(e)}});
app.post("/api/projects", requireAdmin, async (req,res,next)=>{try{const rows=await readData("projects",[]);const row={id:makeId(),galleryImages:[],software:[],featured:false,visible:true,displayOrder:0,aspect:"wide",...req.body};if(row.featured)rows.forEach(x=>x.featured=false);rows.push(row);await writeData("projects",rows);res.status(201).json(row)}catch(e){next(e)}});
app.put("/api/projects/:id", requireAdmin, async (req,res,next)=>{try{const rows=await readData("projects",[]);const i=rows.findIndex(x=>x.id===req.params.id);if(i<0)return res.status(404).json({message:"Project not found"});if(req.body.featured===true)rows.forEach(x=>x.featured=false);rows[i]={...rows[i],...req.body,id:rows[i].id};await writeData("projects",rows);res.json(rows[i])}catch(e){next(e)}});
app.delete("/api/projects/:id", requireAdmin, async (req,res,next)=>{try{const rows=await readData("projects",[]);await writeData("projects",rows.filter(x=>x.id!==req.params.id));res.status(204).end()}catch(e){next(e)}});

const dist = path.join(root, "dist");
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get("*", (_req,res)=>res.sendFile(path.join(dist,"index.html")));
}
app.use((error,_req,res,_next)=>{console.error(error);res.status(error.code==="LIMIT_FILE_SIZE"?413:500).json({message:error.code==="LIMIT_FILE_SIZE"?"File is too large":"Server error"})});

const port = Number(process.env.PORT || 5174);
app.listen(port,()=>console.log(`VZNN server running on http://localhost:${port}`));
