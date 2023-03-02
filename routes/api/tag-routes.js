const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
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
    .then(dbTagData => res.json(dbTagData))
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Category.findOne({
    where: {
      id: req.params.id
    }, 
    attributes: [
      'id',
      'tag_name'
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
  .then(dbTagData => res.json(dbTagData))
      .catch(error => {
        console.log(error)
        res.status(500).json(error)
      })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    id: req.body.id,
    tag_name: req.body.tag_name
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'Empty' })
        return
      }
      res.json(dbTagData)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'Empty' })
        return
      }
      res.json(dbTagData)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
});

module.exports = router;
