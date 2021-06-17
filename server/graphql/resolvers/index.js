const data = {
  portfolios: [
    {
      _id: 'sad87da79',
      title: 'Job in Netcentric',
      company: 'Netcentric',
      companyWebsite: 'www.google.com',
      location: 'Spain, Barcelona',
      jobTitle: 'Engineer',
      description: 'Doing something, programing....',
      startDate: '01/01/2014',
      endDate: '01/01/2016',
    },
    {
      _id: 'da789ad1',
      title: 'Job in Siemens',
      company: 'Siemens',
      companyWebsite: 'www.google.com',
      location: 'Slovakia, Kosice',
      jobTitle: 'Software Engineer',
      description: 'Responsoble for parsing framework for JSON medical data.',
      startDate: '01/01/2011',
      endDate: '01/01/2013',
    },
    {
      _id: 'sadcxv9',
      title: 'Work in USA',
      company: 'WhoKnows',
      companyWebsite: 'www.google.com',
      location: 'USA, Montana',
      jobTitle: 'Housekeeping',
      description: 'So much responsibility....Overloaaaaaad',
      startDate: '01/01/2010',
      endDate: '01/01/2011',
    },
  ],
};

exports.portfolioQueriesResolvers = {
  hello: () => {
    return 'hello world';
  },
  portfolio: (root, { id }) => {
    const portfolio = data.portfolios.find((p) => p._id === id);
    return portfolio;
  },
  portfolios: () => {
    return data.portfolios;
  },
};

exports.portfolioMutationsResolvers = {
  createPortfolio: (root, { portfolioInput }) => {
    const _id = require('crypto').randomBytes(10).toString('hex');
    const newPortfolio = {
      _id,
      ...portfolioInput,
    };
    data.portfolios.push(newPortfolio);
    return newPortfolio;
  },
  updatePortfolio: (root, { id, portfolioInput }) => {
    const index = data.portfolios.findIndex((p) => p._id === id);
    const oldPortfolio = data.portfolios[index];
    const updatedPortfolio = {
      ...oldPortfolio,
      ...portfolioInput,
    };
    data.portfolios[index] = updatedPortfolio;
    return updatedPortfolio;
  },
  deletePortfolio: (root, { id }) => {
    const index = data.portfolios.findIndex((p) => p._id === id);
    data.portfolios.splice(index, 1);
    return id;
  },
};
