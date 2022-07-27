import Category from '../infra/mongo/models/Category';

export class CategoryFormRepository {
  async create(categoryId, dataSource) {
    const categoryForm = await Category.findByIdAndUpdate(
      categoryId,
      {
        $push: {
          additionalInfoForms: {
            $each: dataSource
          }
        }
      },
      { new: true }
    );
    return categoryForm;
  }

  async remove(categoryId) {
    try {
      return await Category.findByIdAndUpdate(categoryId, { additionalInfoForms: null }, { new: true });
    } catch (e) {
      throw new Error(e);
    }
  }

  async addElement(categoryId, dataSource) {
    return await Category.findByIdAndUpdate(
      categoryId,
      {
        $push: {
          additionalInfoForms: dataSource
        }
      },
      { new: true }
    );
  }
}
