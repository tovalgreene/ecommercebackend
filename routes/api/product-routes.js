const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
// find all products
// be sure to include its associated Category and Tag data

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Category, { model: Tag, through: ProductTag }],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
// find a single product by its `id`
// be sure to include its associated Category and Tag data

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Category, { model: Tag, through: ProductTag }],
    });

    if (!product) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }

    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => (
        {
          product_id: product.id,
          tag_id,
        }));
await ProductTag.bulkCreate(productTagIdArr);
    }


res.status(200).json(product);
  } catch (err) {
  res.status(400).json(err);
}
});


// update product
router.put('/:id', async (req, res) => {
  try {
    const [affectedRows] = await Product.update(req.body, {
      where: { id: req.params.id },
    });

    if (affectedRows > 0 && req.body.tagIds && req.body.tagIds.length) {
      const currentProductTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      const currentTagIds = currentProductTags.map(({ tag_id }) => tag_id);

      const newTagIds = req.body.tagIds.filter(
        (tag_id) => !currentTagIds.includes(tag_id)
      );

      const tagsToRemove = currentProductTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await ProductTag.destroy({ where: { id: tagsToRemove } });

      const newProductTags = newTagIds.map((tag_id) => ({
        product_id: req.params.id,
        tag_id,
      }));

      await ProductTag.bulkCreate(newProductTags);
    }

    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: { id: req.params.id },
    });

    if (!deletedProduct) {
      res.status(404).json({ message: 'No product found with this id' })
      return;
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
