const sequelize = require('../db')
class EditorController {
  async getColumnsList(req, res) {
    const [results, metadata] =
      await sequelize.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'products'; ")
    return (
      res.json(results)
    )
  }
}
module.exports = new EditorController()