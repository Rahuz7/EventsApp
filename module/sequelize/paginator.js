

const paginate = async (model, pageNumber, pageSize, attributes = null, includes = null, where = null) => {
    try {
      const offset = (pageNumber - 1) * pageSize;

 
      const records = await model.findAndCountAll({
        offset,
        limit: pageSize,
        attributes: attributes,
        where: where,
        include: includes,
        raw: true,
        nest:true
      });
      console.log(records)
      return records;
    } catch (error) {
      console.error('Une erreur est survenue lors de la pagination de la table :', error);
      throw error;
    } 
  }

  module.exports = {paginate};