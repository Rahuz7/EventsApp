const paginate = async (model, pageNumber, pageSize, attributes = null, includes = null) => {
    try {
      const offset = (pageNumber - 1) * pageSize;
  
      // Utilisez Sequelize pour effectuer la pagination et récupérer les attributs spécifiés
      const records = await model.findAndCountAll({
        offset,
        limit: pageSize,
        attributes: attributes,
        include: includes,
        raw: true, 
      });
  
      return records.rows;
    } catch (error) {
      console.error('Une erreur est survenue lors de la pagination de la table :', error);
      throw error;
    } 
  }

  module.exports = {paginate};