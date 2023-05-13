const db = require("../models");
const {paginate} = require('../module/sequelize/paginator');
const User = db.user;

const  paginateUser = async (data) => {
    console.log("createUser data:", data)
    let providedData = {
        success: false,
        message: "Erreur durant la pagination des l'utilisateur."
    }

    try {

      const user = await paginate(User, data.pageNumber, data.pageSize, ['id', 'username', 'email'])
      providedData.user = user
      providedData.success = true;
      providedData.message = "Utilisateurs paginés avec succés"
      return {
        providedData
      }

    } catch (e) {
        return {
            providedData
        }
    }
}

module.exports = {
    paginateUser
};