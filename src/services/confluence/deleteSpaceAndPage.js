const Confluence = require("confluence-api");
const request = require("request");

const config = require("../../config");

exports.deleteSpace = (req, res, next) => {
  const { spaceKey } = req.body;

  const options = {
    method: "DELETE",
    url: `https://rangers.atlassian.net/wiki/rest/api/space/${spaceKey}`,
    auth: { username: config.username, password: config.password }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    return res.send(body);
  });
};

exports.deletePage = (req, res, next) => {
  const confluenceConfig = {
    username: config.username,
    password: config.password,
    baseUrl: "https://rangers.atlassian.net/wiki"
  };

  const { space, title } = req.params;

  const confluence = new Confluence(confluenceConfig);

  confluence.getContentByPageTitle(space, title, function(err, data) {
    if (err) {
      return res.json({ errors: err });
    }

    let { id } = data.results[0] || null;

    var pageOptions = {
      method: "DELETE",
      url: `https://rangers.atlassian.net/wiki/rest/api/content/${id}`,
      auth: { username: config.username, password: config.password }
    };

    request(pageOptions, function(error, response, body) {
      if (error) throw new Error(error);

      return res.json({ deleted: true });
    });
  });
};
