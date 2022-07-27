import Category from '../infra/mongo/models/Category';
import { Category as CategoryEntitiy } from '../domain/entities/category/Category';
export class CategoryRepository {
  async delete(dataSource): Promise<CategoryEntitiy | undefined> | undefined {
    try {
      return await Category.findByIdAndDelete(dataSource);
    } catch (e) {
      throw new Error(e);
    }
  }
  async create(dataSource) {
    const created = await Category.create({ ...dataSource, parent: dataSource.parentId });
    return created;
  }

  async createMain(dataSource) {
    const record = await Category.create(dataSource);
    return record;
  }

  async findCategory(dataSource) {
    const record = await Category.findById(dataSource);
    return record;
  }

  async findCategoryByParentId(dataSource) {
    const record = await Category.find({ parent: dataSource });
    return record;
  }

  async update(categoryId, dataSource) {
    const record = await Category.findByIdAndUpdate(
      categoryId,
      { ...dataSource, parent: dataSource['parentId'] },
      { new: true }
    );
    return record;
  }

  async getMainCategories() {
    return await Category.find({ isHead: true });
  }
}
