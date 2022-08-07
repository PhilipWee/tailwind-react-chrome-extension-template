const { Octokit } = require('octokit');

const run = async () => {
  const octokit = new Octokit({
    auth: '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',
  });

  console.log(octokit);

  const result = await octokit.request('POST /gists', {
    description: 'dee',
    public: true,
    files: {
      'gee.js': {
        content: 'console.log(shjeesh)',
      },
    },
  });
  console.log(result);
};

run();
