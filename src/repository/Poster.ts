import Poster from '../infra/mongo/models/Poster';

export class PosterRepository {
  async create(dataSource) {
    const post = await Poster.create(dataSource);
    return post;
  }
}
