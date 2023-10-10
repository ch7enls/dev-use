import axios from "axios";

// // 在发送请求前，将 token 存储到 localStorage 中：
// localStorage.setItem('token', '7a18e935-f814-4456-9cac-1e84e1ef6fae');

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // 使用localStorage设置authorization，如'Authorization':'Bearer '+localStorage.getItem("authorization"),
      config.headers.Authorization = token;
    }
    console.log("请求拦截成功：", config);
    return config;
  },
  (error) => {
    console.error("请求拦截失败：", error);
    return Promise.reject(error);
  }
);

// 响应拦截器--返回的东西
axios.interceptors.response.use(
  (response) => {
    console.log("响应拦截成功：", response.data);
    // 验证token是否过期，过期则清除
    if (response.code == 401) {
      alert("登录过期，请重新登录。");
      localStorage.removeItem("token");
      console.log("token:" + token + "已清除");
    } else if (response.code == 200) {
      const message = response.data.message; //创建成功提示信息到页面上。 可以使用ElNotification通知
      // success(message);
    } else {
      const message = response.data.message;
      // error(message);
    }
    return response;
  },
  (error) => {
    console.error("响应拦截失败：", error);
    return Promise.reject(error);
  }
);

// 封装方法
async function request(method, url, data, responseType) {
  try {
    const response = await axios({
      method: method,
      url: "http://127.0.0.1:8080" + url,
      data: data,
      responseType: responseType,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

// 导出封装后的 request 模块
export default request;
