/* eslint-disable */

export class Tracker {
  constructor(host, project, logstore) {
    this.uri =
      `https://${project
      }.${host
      }/logstores/${logstore
      }/track?APIVersion=0.6.0`;
    this.params = {};
    // this.dna = md5(`${navigator.userAgent + +new Date()}${Math.random() * 999999999}`);
  }

  push(key, value) {
    if (!key || !value) {
      return false;
    }
    this.params[key] = value;
  }

  logger() {
    let queryString = '&';
    const params = {
      // dna: this.dna
    };
    Object.keys(this.params).forEach(key => {
      params[key] = encodeURIComponent(this.params[key]);
      queryString += `${key}=${encodeURIComponent(this.params[key])}&`
    });
    queryString += `data=${JSON.stringify(params)}`;
    const image = new Image();
    image.src = this.uri + queryString;
  }
}


export const TrackerConfig = [
  'ap-southeast-5.log.aliyuncs.com', // 服务域名
  'desty-prod-logs', // Project name
  'desty-market'// Logstore name
];

