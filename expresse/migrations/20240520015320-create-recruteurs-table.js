'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Recruteurs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idEntreprise: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Entreprises', // Nom de la table de l'entreprise, doit correspondre à celle définie dans votre migration Entreprises
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      prenom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      adresse: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_naissance: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Ajout des index sur les colonnes id et idEntreprise
    await queryInterface.addIndex('Recruteurs', ['id']);
    await queryInterface.addIndex('Recruteurs', ['idEntreprise']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Recruteurs');
  }
};
