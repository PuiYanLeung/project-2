const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    });

const Cat = sequelize.define('Cat', {
    name: { type: DataTypes.STRING, allowNull: false },
    },
    {}
);

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established");

        await Cat.sync({alter:true});
        const cat = Cat.build({name:"Fluffy"});

        await cat.save();


        await Cat.update({name: "Bob"},{
            where:{
                name: "Fluffy"
            }
        });

        // await Cat.destroy({
        //     where: {
        //         name: "Bob"
        //     }
        // });

        // const fluffy = await Cat.findAll({
        //     where:{
        //         name: "Fluffy"
        //     }
        // });
        // console.log(fluffy);

        const cats = await Cat.findAll();
        console.log("All Cats", JSON.stringify(cats, null, 2));

        console.log(await cat.save());

    } catch (error) {
        console.log("Connection failed");
    }
    await sequelize.close();
    process.exit();
};

main();

