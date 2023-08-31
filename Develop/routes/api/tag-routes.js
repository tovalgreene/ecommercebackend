const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product,
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find all tags
// be sure to include its associated Product data

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: Product,
    });
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find a single tag by its `id`
// be sure to include its associated Product data

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const [affectedRows] = await Tag.update(
      { tag_name: req.body.tag_name }, 
      {
        where: { id: req.params.id },
      }
    );

    if (affectedRows === 0) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.json({ message: 'Tag updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (!deletedTag) {
      res.status(404).json({ message: 'No tag found with this id' })
      return;
    }

    res.json({ message: 'Tag deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
