export default class CodeGenerator {
  async generate() {
    return Math.floor(Math.random() * 900000 + 100000).toString();
  }
}
