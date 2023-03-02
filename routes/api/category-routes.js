const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

 router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [ {
      model: Product,
      attributes: [
        'id', 
        'category_id', 
        'product_name', 
        'stock', 
        'price'
      ],
    }]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(error)
      res.status(500).json(error)
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    }, 
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: [
          'id', 
          'category_id', 
          'product_name', 
          'stock', 
          'price'
        ],
      }]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
        console.log(error)
        res.status(500).json(error)
      })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'Empty' })
        return;
      }
      res.json(dbCategoryData)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
});

router.delete('/:id', (req, res) => {
  // delete(dsetroy) a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'Empty' })
        return
      }
      res.json(dbCategoryData)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
});

module.exports = router;
