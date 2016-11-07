module.exports = function(sequelize, DataType) {
    return sequelize.define('comments', {
        texto: {
            type: DataType.STRING,
            validate: {
                notEmpty: {msg: "-> Falta comentario"}
            }
        }
    });
}