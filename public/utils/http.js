let $http = (function() {
  let xhr = new XMLHttpRequest();

  function post(url, data = {}) {
    let dataStr = '';
    for(let d in data) {
      dataStr += `${d}=${data[d]}&`
    }
    dataStr.slice(-1);
    xhr.open("POST", url);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(dataStr);
    return new Promise((resolve, reject) => {
      xhr.onload = function() {
        resolve(this.responseText)
      }
    })
  }
  return {
    post
  }
}());