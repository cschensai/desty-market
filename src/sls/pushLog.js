/* eslint-disable */

import md5 from 'md5';
import { Tracker, TrackerConfig } from './Tracker.js';


const createTracker = function (config) {
  const tracker = new Tracker(...config);
 
  let did = localStorage.getItem('sls_did');
  if (!did) {
    did = md5(`${navigator.userAgent}${+new Date()}${Math.random() * 999999999}`);
    localStorage.setItem('sls_did', did)
  }
  tracker.params = {
    location: window.location.href,
    did,
    agent: navigator.userAgent,
    app_env: import.meta.env.VITE_NODE_ENV,
  };
  return tracker;
};

/**
 * 基础日志上报
 * @param {*} data
 */
// export const pushLog = (data = {}, mandatory = true) => {
export const pushLog = (data = {}, mandatory = false) => {
  if (import.meta.env.VITE_NODE_ENV === 'production' || mandatory) {
    const tracker = createTracker(TrackerConfig);
    tracker.push('timeStamp', +new Date())
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const i in data) {
      tracker.push(i, data[i]);
    }
    tracker.logger();
  }
};
