const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

// 允许所有来源访问（在生产环境中，最好设置为具体的前端域名）
app.use(cors());

// 中间件，用于解析请求体中的JSON数据
app.use(express.json());

const server = app.listen(8080, () => {
  console.log("server is running");
});

const connection = mysql.createConnection({
  host: "159.75.184.122",
  user: "root",
  password: "mysql123456",
  database: "blog",
});

// 连接到数据库
connection.connect((err) => {
  if (err) {
    console.error("连接数据库出错: " + err.stack);
    return;
  }
  console.log("连接到数据库的ID是 " + connection.threadId);
});

// 处理GET请求，执行数据库查询
app.get("/get-data", (req, res) => {
  connection.query(
    "SELECT * FROM tb_blog WHERE status = 1",
    (err, results, fields) => {
      if (err) {
        return res.status(500).json({ error: "查询出错" });
      }
      res.json({ data: results });
    }
  );
});

// 处理POST请求，执行数据库插入
app.post("/insert-data", (req, res) => {
  const dataToInsert = req.body;
  connection.query(
    "INSERT INTO tb_blog SET ?",
    dataToInsert,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "插入数据出错" });
      }
      res.json({
        message: "数据新增成功",
        insertedId: results.insertId,
        data: dataToInsert,
      });
    }
  );
});

// 处理PUT请求，执行数据库更新
app.put("/update-data", (req, res) => {
  const updatedData = req.body;
  const id = req.body.id;
  connection.query(
    "UPDATE tb_blog SET ? WHERE id = ?",
    [updatedData, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "数据库更新出错" });
      }
      res.json({
        message: "数据库更新成功",
        affectedRows: results.affectedRows,
        data: updatedData,
      });
    }
  );
});

// 处理DELETE请求，执行数据库删除
app.put("/delete-data", (req, res) => {
  const id = req.body.id;
  connection.query(
    "UPDATE tb_blog SET status = 0 WHERE id = ?",
    id,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "数据库删除出错" });
      }
      res.json({
        message: "数据库删除已删除",
        affectedRows: results.affectedRows,
        id,
      });
    }
  );
});
