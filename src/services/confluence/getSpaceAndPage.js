const Confluence = require("confluence-api");
const configEnv = require("../../config");
const config = {
  username: configEnv.username,
  password: configEnv.password,
  baseUrl: "https://rangers.atlassian.net/wiki"
};

// const space = "NEWSPACE";
// const title = "Example space1562169276732";
// const pageContent =
//   "<p>This is a new page with awesome content! Updated " +
//   new Date().toISOString() +
//   "</p>";
// const homePageId = "491524";
// const testPageId = "491526";
// const newPageId = 0;
// const version = 0;

const confluence = new Confluence(config);

exports.contentByPageTitle = (req, res, next) => {
  const { space, title } = req.params;

  confluence.getContentByPageTitle(space, title, function(err, data) {
    if (err) {
      return err;
    }
    // console.log(data);
    return res.send(data);
  });
};

exports.getNewSpace = (req, res, next) => {
    //  console.log("Hit");
  const { space } = req.params;

  confluence.getSpace(space, (err, data) => {
    if (err) {
      return err;
    }

    return res.send(data);
  });
};
