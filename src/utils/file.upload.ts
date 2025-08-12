import fs from 'node:fs';
import path from 'node:path';
import multer, { type FileFilterCallback, type StorageEngine } from 'multer';

const storage = (uploadPath: string): StorageEngine => {
  return multer.diskStorage({
    destination: (_req, _file, cb) => {
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (_req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
};

const createUpload = (uploadPath: string, allowedTypes: string[]) => {
  const fileFilter = (
    _req: Express.Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Invalid file type. Only ${allowedTypes.join(', ')} are allowed.`,
        ),
      );
    }
  };

  return multer({
    storage: storage(uploadPath),
    fileFilter,
    limits: {
      fileSize: 200 * 1024 * 1024, // 5 MB
    },
  });
};

export default createUpload;
