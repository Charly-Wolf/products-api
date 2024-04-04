const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  const { title, sort, fields, numericFilters } = req.query

  const queryObject = {}

  if (title) {
    queryObject.title = { $regex: title, $options: 'i' }
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b(<|>|<=|>=|=)\b/g
    let filters = numericFilters.replace(
      regEx,
      match => `-${operatorMap[match]}-`
    )
    const options = ['price', 'amount']
    filters = filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    })
  }

  let result = Product.find(queryObject)

  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.collation({ locale: 'en' }).sort('title') // case insensitive
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  // pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)

  const products = await result

  res.status(200).json({ msg: products, nbHits: products.length })
}

module.exports = { getAllProducts }
