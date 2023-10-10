const mysql = require("mysql");

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

// // 查
// connection.query("SELECT * FROM tb_blog", (err, results, fields) => {
//   if (err) {
//     console.error("查询出错: " + err.stack);
//     return;
//   }
//   console.log('--------------------------SELECT----------------------------');
//   console.log("查询的结果:", results);
//   console.log('------------------------------------------------------------\n\n');  
//   return results
// });

// // 增
// const dataToInsert = {
//   content: "这是个测试",
//   pmg_url: "这是个测试URL",
// };

// connection.query(
//   "INSERT INTO tb_blog SET ?",
//   dataToInsert,
//   (err, results) => {
//     if (err) {
//       console.error("新增数据出错: " + err.stack);
//       return;
//     }
//     console.log("插入数据ID:", results.insertId);
//   }
// );

// // 改
// const updatedData = {
//   content: "这是修改的数据",
// };

// connection.query(
//   "UPDATE tb_blog SET ? WHERE id = ?",
//   [updatedData, 2], // 修改的ID就是updatedData后的数字
//   (err, results) => {
//     if (err) {
//       console.error("修改出错: " + err.stack);
//       return;
//     }
//     console.log("修改数据ID", results.affectedRows, "rows");
//   }
// );

// // 删
// connection.query("DELETE FROM tb_blog WHERE id = ?", 3, (err, results) => {  // 删除的ID就是这里的数字
//   if (err) {
//     console.error("删除数据出错: " + err.stack);
//     return;
//   }
//   console.log("已删除数据第", results.affectedRows, "行");
// });


// 关闭数据库
connection.end((err) => {
  if (err) {
    console.error("关闭数据库出错: " + err.stack);
    return;
  }
  console.log("关闭数据库.");
});
