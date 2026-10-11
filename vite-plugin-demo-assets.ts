import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

const MIME_TYPES: Record<string, string> = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.json': 'application/json',
};

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function copyDirRecursive(src: string, dest: string) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
      // Also mirror kebab-case and lowercase folder names for cross-platform safety
      const kebabName = toKebabCase(entry.name);
      const lowerName = entry.name.toLowerCase();
      if (kebabName !== entry.name) {
        copyDirRecursive(srcPath, path.join(dest, kebabName));
      }
      if (lowerName !== entry.name && lowerName !== kebabName) {
        copyDirRecursive(srcPath, path.join(dest, lowerName));
      }
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export function demoAssetsPlugin(): Plugin {
  return {
    name: 'vite-plugin-demo-assets',
    enforce: 'pre',

    // 1. Transform relative image/media src strings inside demo components
    transform(code: string, id: string) {
      const normalizedId = id.replace(/\\/g, '/');
      const match = normalizedId.match(/\/src\/pages\/demos\/([^/]+)\//i);

      // Only transform files inside a demo folder (ignoring public directory)
      if (!match || match[1].toLowerCase() === 'public') {
        return null;
      }

      const folderName = match[1];
      const demoSlug = toKebabCase(folderName);

      let transformed = code;

      // Match JSX src="Logo.svg" or src="./Logo.svg" (not absolute, not http, not data:, not blob:)
      transformed = transformed.replace(
        /\bsrc=(["'])(?!https?:\/\/|\/|data:|blob:)(?:\.\/)?([^"']+)\1/g,
        `src=$1/demos/${demoSlug}/$2$1`
      );

      // Match JSX src={"Logo.svg"} or src={'./Logo.svg'}
      transformed = transformed.replace(
        /\bsrc=\{([`"'])(?!https?:\/\/|\/|data:|blob:)(?:\.\/)?([^`"']+)\1\}/g,
        `src={$1/demos/${demoSlug}/$2$1}`
      );

      // Match JSX src={... ? "Logo.svg" : "Logo2.svg"}
      transformed = transformed.replace(
        /\bsrc=\{([^}]+)\}/g,
        (fullMatch, expr) => {
          const replaced = expr.replace(
            /(["'`])(?!https?:\/\/|\/|data:|blob:)(?:\.\/)?([^"'`]+\.(?:svg|png|jpe?g|webp|gif|avif|ico))\1/g,
            `$1/demos/${demoSlug}/$2$1`
          );
          return `src={${replaced}}`;
        }
      );

      // Match compiled JS object property src: "Logo.svg" or src: 'Logo.svg'
      transformed = transformed.replace(
        /\bsrc:\s*(["'`])(?!https?:\/\/|\/|data:|blob:)(?:\.\/)?([^"'`]+)\1/g,
        `src: $1/demos/${demoSlug}/$2$1`
      );

      // Match SVG href="Logo.svg" or href="./Logo.svg"
      transformed = transformed.replace(
        /\bhref=(["'])(?!https?:\/\/|\/|data:|blob:|#)(?:\.\/)?([^"']+)\1/g,
        `href=$1/demos/${demoSlug}/$2$1`
      );

      // Match compiled JS href: "Logo.svg"
      transformed = transformed.replace(
        /\bhref:\s*(["'`])(?!https?:\/\/|\/|data:|blob:|#)(?:\.\/)?([^"'`]+)\1/g,
        `href: $1/demos/${demoSlug}/$2$1`
      );

      // Match srcset="..."
      transformed = transformed.replace(
        /\bsrcset=(["'])(?!https?:\/\/|\/|data:|blob:)(?:\.\/)?([^"']+)\1/g,
        `srcset=$1/demos/${demoSlug}/$2$1`
      );

      // Match CSS url("...")
      transformed = transformed.replace(
        /url\((['"]?)(?!https?:\/\/|\/|data:|blob:)(?:\.\/)?([^'")]+)\1\)/g,
        `url($1/demos/${demoSlug}/$2$1)`
      );

      if (transformed !== code) {
        return {
          code: transformed,
          map: null,
        };
      }

      return null;
    },

    // 2. Dev server middleware to serve assets from src/pages/demos/public/:slug/*
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();

        const parsedUrl = new URL(req.url, 'http://localhost');
        const pathname = decodeURIComponent(parsedUrl.pathname);
        const publicDir = path.resolve(process.cwd(), 'src/pages/demos/public');

        if (!fs.existsSync(publicDir)) return next();

        let reqSlug: string | null = null;
        let assetPath: string | null = null;

        // Case A: Direct asset URL /demos/:slug/:assetPath (e.g. /demos/shrimp/Logo.svg)
        const directMatch = pathname.match(/^\/demos\/([^/]+)\/(.+)$/);
        if (directMatch) {
          reqSlug = directMatch[1];
          assetPath = directMatch[2];
        } else {
          // Case B: Relative URL fallback /demos/:assetPath or /:assetPath with referer
          const fallbackMatch = pathname.match(/^\/demos\/(.+)$/) || (req.headers.referer ? pathname.match(/^\/(.+)$/) : null);
          if (fallbackMatch && req.headers.referer) {
            try {
              const refererUrl = new URL(req.headers.referer);
              const refMatch = refererUrl.pathname.match(/^\/demos\/([^/]+)/);
              if (refMatch && refMatch[1].toLowerCase() !== 'public') {
                reqSlug = refMatch[1];
                assetPath = fallbackMatch[1];
              }
            } catch {}
          }
        }

        if (!reqSlug || !assetPath) return next();

        const subfolders = fs.readdirSync(publicDir);
        // Case-insensitive match on folder name or kebab-case
        let matchedFolder = subfolders.find((f) => {
          const lower = f.toLowerCase();
          const kebab = toKebabCase(f);
          const reqLower = reqSlug!.toLowerCase();
          return lower === reqLower || kebab === reqLower;
        });

        // If reqSlug wasn't a valid demo folder (e.g. /demos/icons/Arrow 1.svg where reqSlug="icons"), check referer for actual demo folder
        if (!matchedFolder && req.headers.referer) {
          try {
            const refererUrl = new URL(req.headers.referer);
            const refMatch = refererUrl.pathname.match(/^\/demos\/([^/]+)/);
            if (refMatch && refMatch[1].toLowerCase() !== 'public') {
              const refSlug = refMatch[1].toLowerCase();
              const refFolder = subfolders.find(
                (f) => f.toLowerCase() === refSlug || toKebabCase(f) === refSlug
              );
              if (refFolder) {
                matchedFolder = refFolder;
                assetPath = `${reqSlug}/${assetPath}`;
              }
            }
          } catch {}
        }

        if (!matchedFolder) return next();

        const filePath = path.resolve(publicDir, matchedFolder, assetPath);

        // Security check: ensure path stays within publicDir
        if (filePath.startsWith(publicDir) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

          res.setHeader('Content-Type', mimeType);
          res.setHeader('Cache-Control', 'no-cache');
          fs.createReadStream(filePath).pipe(res);
          return;
        }

        next();
      });
    },

    // 3. Build hook: Copy src/pages/demos/public to dist/demos for production deployment
    closeBundle() {
      const publicDir = path.resolve(process.cwd(), 'src/pages/demos/public');
      const outDir = path.resolve(process.cwd(), 'dist/demos');

      if (fs.existsSync(publicDir)) {
        copyDirRecursive(publicDir, outDir);
        console.log(`[vite-plugin-demo-assets] Copied demo assets from ${publicDir} to ${outDir}`);
      }
    },
  };
}
