/**
 * 跳转新的链接加上原始链接的参数
 * @param {String} url 要跳转到的链接
 * @param {Object} route 当前页面的route参数
 * @returns 加上原始链接的参数后的链接
 */

export const linkURLAddQuery = (url, route) => {
  let _url = url;
  const [originUrl = "", urlSearchStr = ""] = _url?.split("?") || [];
  const formatUrlSearchObj = new URLSearchParams(urlSearchStr);
  const currentParams = route.query;
  if (Object.keys(currentParams).length > 0) {
    // 将当前页面的参数添加到目标 URL 中
    for (const key in currentParams) {
      if (formatUrlSearchObj.has(key)) {
        formatUrlSearchObj.set(key, currentParams[key]);
      } else {
        formatUrlSearchObj.append(key, currentParams[key]);
      }
    }
    _url = `${originUrl}?${formatUrlSearchObj.toString()}`;
  }
  return _url;
};

// 操作导航
export function handleNav(key, config, route, push) {
  let url;
  let newTab = false;
  if (key === 'market') {
    push(linkURLAddQuery('/', route));
    return;
  }
  switch (key) {
    case 'home':
    case 'mainLogo':
      url = `${config.VITE_HOME_URL}`;
      break;
    case 'companycontactus':
      url = `${config.VITE_HOME_URL}/ajak`;
      break;
    case 'startnow':
      const redirect_url = window.encodeURIComponent(location.href);
      url = `${config.VITE_OMNI_URL}/register?redirectUrl=${redirect_url}`;
      break;
    case 'destypage':
      url = config.VITE_PAGE_URL;
      break;
    case 'destystore':
      url = config.VITE_STORE_URL;
      break;
    case 'destyomni':
      newTab = true;
      url = `${config.VITE_HOME_URL}/commerce/omniregisterlp`;
      break;
    case 'destychat':
      url = config.VITE_CHAT_URL;
      break;
    case 'destywholesale':
        newTab = true;
        url = `${config.VITE_WHOLESALE_URL}/join-supplier?from=desty-homepage`;
        break;
    case 'blog':
    case 'companyblog':
      newTab = true;
      url = 'https://desty.page/blog';
      break;
    case 'career':
    case 'companycareer':
      newTab = true;
      url = 'https://desty.freshteam.com/jobs';
      break;
    case 'helpcenter':
      newTab = true;
      url = 'https://desty.tawk.help';
      break;
    case 'instagram':
      url = 'https://www.instagram.com/desty.app';
      break;
    case 'facebook':
      url = 'https://www.facebook.com/desty.commerce';
      break;
    case 'linkedin':
      url = 'https://www.linkedin.com/company/destyapp';
      break;
    case 'youtube':
      url = 'https://www.youtube.com/channel/UC7xucpjHrWRs3XGJJoC8lJA';
      break;
    case 'privacy':
      url = `${config.VITE_HOME_URL}/privacy`;
      break;
    case 'terms':
      url = `${config.VITE_HOME_URL}/terms`;
      break;
    case 'companyaboutus':
      url = 'https://desty.page/company';
      break;
    default:
      break;
  }
  if (url) {
    if (newTab) window.open(linkURLAddQuery(url, route));
    else location.href = linkURLAddQuery(url, route);
  };
}
