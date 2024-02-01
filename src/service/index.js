import services from "@/utils/http";

// get tools detail
export const getToolsDetail = (data = {}) => {
  return services({
    url: "/platform/admin/appDetail/detail/getByDetailUrl",
    method: "post",
    data,
  });
}
// get detail query list
export const getAddQuery = (data = {}) => {
  return services({
    url: "/platform/admin/appDetail/detail/getOtherApp",
    method: "post",
    data,
  });
}

// add app status
export const addApp = (data = {}) => {
  return services({
    url: "/platform/admin/appDetail/detail/install",
    method: "post",
    data,
  });
}

// get desty list
export const getDestyAppQueryList = (data = {}) => {
  return services({
    url: "/platform/admin/appDetail/market/getDesty",
    method: "post",
    data,
  });
}

// get other list
export const getOtherAppQueryList = (data = {}) => {
  return services({
    url: "/platform/admin/appDetail/market/getOtherApp",
    method: "post",
    data,
  });
}


// get category
export const getCategoryList = (data = {}) => {
  return services({
    url: "/platform/admin/appCategory/dashboard/get",
    method: "post",
    data,
  });
}

// get user info
export const getUserInfo = (data = {}) => {
  return services({
    url: "/platform/admin/appDetail/detail/profile",
    method: "post",
    data,
  });
}

// reach us
export const reachUs = (data = {}) => {
  return services({
    url: "/platform/market/index/app/contact",
    method: "post",
    data,
  });
}

