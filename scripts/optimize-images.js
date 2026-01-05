/**
 * Image Optimization Script
 * Resizes and compresses images for better web performance
 */
import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, "..", "public");

const optimizations = [
  {
    input: "profile.jpg",
    outputs: [
      { name: "profile-256.webp", width: 256, height: 256, format: "webp" },
      { name: "profile-512.webp", width: 512, height: 512, format: "webp" },
      { name: "profile.webp", width: 512, height: 512, format: "webp" },
    ],
  },
  {
    input: "Capgemini.png",
    outputs: [{ name: "capgemini.webp", format: "webp", width: 800 }],
  },
  {
    input: "Learnathon.png",
    outputs: [{ name: "learnathon.webp", format: "webp", width: 800 }],
  },
  {
    input: "Skill la thon.png",
    outputs: [{ name: "skill-la-thon.webp", format: "webp", width: 800 }],
  },
  {
    input: "python-certiport.png",
    outputs: [{ name: "python-certiport.webp", format: "webp", width: 800 }],
  },
  {
    input: "mongoDB.png",
    outputs: [{ name: "mongodb.webp", format: "webp", width: 800 }],
  },
  {
    input: "certificate of presentation.png",
    outputs: [
      { name: "certificate-presentation.webp", format: "webp", width: 800 },
    ],
  },
  {
    input: "tripxplo intern certificate.png",
    outputs: [
      { name: "tripxplo-intern-certificate.webp", format: "webp", width: 800 },
    ],
  },
  {
    input: "VEI technologies.jpg",
    outputs: [{ name: "vei-technologies.webp", format: "webp", width: 800 }],
  },
  {
    input: "icon-144.png",
    outputs: [{ name: "icon-144.webp", format: "webp" }],
  },
];

async function optimizeImage(inputPath, outputPath, options) {
  try {
    let pipeline = sharp(inputPath);

    if (options.width && options.height) {
      pipeline = pipeline.resize(options.width, options.height, {
        fit: "cover",
        position: "center",
      });
    }

    if (options.format === "webp") {
      pipeline = pipeline.webp({ quality: 85 });
    } else if (options.format === "avif") {
      pipeline = pipeline.avif({ quality: 80 });
    }

    await pipeline.toFile(outputPath);

    const stats = await fs.stat(outputPath);
    console.log(
      `✅ Created: ${path.basename(outputPath)} (${(stats.size / 1024).toFixed(1)} KB)`,
    );
  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
  }
}

async function main() {
  console.log("🖼️  Starting image optimization...\n");

  for (const opt of optimizations) {
    const inputPath = path.join(PUBLIC_DIR, opt.input);

    try {
      await fs.access(inputPath);
    } catch {
      console.log(`⚠️  Skipping ${opt.input} - file not found`);
      continue;
    }

    const originalStats = await fs.stat(inputPath);
    console.log(
      `📁 Processing: ${opt.input} (${(originalStats.size / 1024).toFixed(1)} KB)`,
    );

    for (const output of opt.outputs) {
      const outputPath = path.join(PUBLIC_DIR, output.name);
      await optimizeImage(inputPath, outputPath, output);
    }
    console.log("");
  }

  console.log("🎉 Image optimization complete!");
}

main().catch(console.error);
