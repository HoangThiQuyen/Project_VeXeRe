const mkdirp = require("mkdirp");
const multer = require("multer");

const uploadImage = (type) => {
  // tạo đường dẫn mà folder chưa được tạo trước
  // mkdirp.sync(`./public/images/${type}`);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //setup thư mục lưu file
      cb(null, `./public/images/${type}`);
    },
    filename: function (req, file, cb) {
      // đặt lại ten file lấy originalname: để lấy tên và đuôi file
      // thêm ngày trước tên file để tránh trường hợp file giống nhau đè mất tên file
      cb(null, Date.now() + "_" + file.originalname);
    },
  });

  const upload = multer({
    storage: storage,
    //filter chỉ lấy những file hình
    fileFilter: function (req, file, cb) {
      const extensionImageList = [".png", ".jpg", ".svg"];
      const extensiton = file.originalname.slice(-4);
      const check = extensionImageList.includes(extensiton);
      if (check) {
        cb(null, true);
      } else {
        cb(new Error("file: .png, .jpg, .svg"));
      }
    },
    limit: { fileSize: 1024 * 1024 * 50 }, // 1gb(1024*1024*1024), 1024 byte = 1kb, 1024kb = 1MB, 1024MB = 1GB
  });

  //trả về upload.single trả về đường link có key là type vừa truyền lên
  return upload.single(type);
};

module.exports = { uploadImage };
