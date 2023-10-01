class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword1 = this.queryString.keyword1
      ? {
          title: {
            $regex: this.queryString.keyword1,
            $options: "i",
          },
        }
      : {}; 

    const keyword2 = this.queryString.keyword2
      ? {
          ingredients: {
            $regex: this.queryString.keyword2,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword1, ...keyword2 });
    return this;
  }

  filter() {
      const queryCopy = {...this.queryString}

      //removing some fields for category
      const removeFields = ["keyword1","keyword2"];

      removeFields.forEach((key) => delete queryCopy[key]);
      
      this.query = this.query.find(queryCopy); 
      return this;
  }
}

module.exports = ApiFeatures;
