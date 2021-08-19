const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    });

const Film = sequelize.define('Film', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING
    },
    language: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    }
}, {});

const main = async () => {
    const argv = yargs(hideBin(process.argv)).argv;

    try {
        await sequelize.authenticate();
        //console.log("Connection has been established");

        await Film.sync({ alter: true });

        if (argv.add && argv.name) {

            // console.log(argv.add);
            //console.log(argv.name);
            
            const { _, add, ...options } = {...argv};
            delete options['$0'];
            console.log(options);  

            //await addSong(argv.name);
            const film = Film.build(options);
            await film.save();
            console.log(`Added: ${film.name}`);

        }

        if (argv.show && argv.name) {
            const films = await Film.findAll({where: {name: argv.name}});
            //console.log(films);
            for (let film of films) {
                console.log(`Showing: ${film.name} ${film.language}`);
            }
        }

        if (argv.remove && argv.name) {
            const films = await Film.destroy({where: {name: argv.name}});
            console.log(`Removed: ${films} film(s)`);
        }

        if (argv.edit && argv.name && argv.newName) {
            const films = await Film.update(
                {name: argv.newName},
                {where: {name: argv.name}}
            );
        
            console.log(`Edited: ${films} film(s)`);
        }

        /*
        const film = Film.build({ name: "Toy Story" });
        await film.save();
        console.log(`Added: ${film.name}`);
        */


        /*
        await Cat.update({ name: "Bob" }, {
            where: {
                name: "Fluffy"
            }
        });
        */

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

        //const cats = await Cat.findAll();
        //console.log("All Cats", JSON.stringify(cats, null, 2));

        //console.log(await cat.save());

        

    } catch (error) {
        console.log("Connection failed");
    }

    await sequelize.close();
    process.exit();

};

main();

