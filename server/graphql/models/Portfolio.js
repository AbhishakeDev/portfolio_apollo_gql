class Portfolio {
  constructor(model) {
    this.Model = model;
  }

  getAll() {
    return this.Model.find({});
  }
  getById(id) {
    return this.Model.findById(id);
  }
  createPortfolio(portfolioInput) {
    this.Model.create(portfolioInput);
  }
  findAndUpdate(id, portfolioInput) {
    return this.Model.findOneAndUpdate({ _id: id }, portfolioInput, {
      new: true,
    });
  }
  findAndDelete(id) {
    return this.Model.findOneAndRemove({ _id: id });
  }
}

module.exports = Portfolio;
