const generateUniqueNickname = () => {
    const names = ["ITC"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomSuffix = Math.floor(Math.random() * 1000);
    return `${randomName}_${randomSuffix}`;
  };
  
  module.exports = { generateUniqueNickname };
  