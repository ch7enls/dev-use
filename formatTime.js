// ```
//     传入的参数是时间戳类型,不满两位数的时候,自动补0，便于与后端传参
//     如：时间 2023年8月8日 8:8:8 ,就会转换为 2023年08月08日 08:08:08
// ```

// 补0
const addLeadingZero = (value) => {
  return value < 10 ? "0" + value : value;
};

// 格式化时间
const formatTime = (currentDate) => {
  // const currentDate = new Date(timestamp);
  // console.log(currentDate);
  const year = currentDate.getFullYear(); // 年份
  const month = currentDate.getMonth() + 1; // 月份,注意需要加 1
  const day = currentDate.getDate(); // 日
  const hour = currentDate.getHours(); // 小时
  const minute = currentDate.getMinutes(); // 分钟
  const second = currentDate.getSeconds(); //秒

  const format_month = addLeadingZero(month);
  const format_day = addLeadingZero(day);
  const format_hour = addLeadingZero(hour);
  const format_minute = addLeadingZero(minute);
  const format_second = addLeadingZero(second);

  const result = `${year}-${format_month}-${format_day} ${format_hour}:${format_minute}:${format_second}`;
  console.log("格式化时间：", result);
  return `${year}-${format_month}-${format_day} ${format_hour}:${format_minute}:${format_second}`; // 格式化结果
};

// es6导出
export { formatTime };

// CommonJS导出
// module.exports = formatTime;

// 函数调用
// const currentDate = new Date();
// formatTime(currentDate)
