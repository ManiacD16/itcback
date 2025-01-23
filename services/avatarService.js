const generateAvatarUrl = (seed) => {
    return `https://api.multiavatar.com/${encodeURIComponent(seed)}.svg`;
  };
  
  module.exports = { generateAvatarUrl };
  