const https = require('https');

https.get('https://api.pexels.com/v1/search?query=mustard+oil&per_page=1', {
  headers: {
    'Authorization': '563492ad6f917000010000018a1a36746ef7414cbced063db1d7e29c' // public pexels key found in tutorials
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(JSON.parse(data).photos[0].src.medium));
});
