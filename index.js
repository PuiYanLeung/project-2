require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("./db.js");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const Film = sequelize.define('Film', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING
    },
    lang: {
        type: DataTypes.STRING
    },
    year: {
        type: DataTypes.INTEGER
    },
    duration:{
        type: DataTypes.INTEGER
    },
    quality: {
        type: DataTypes.STRING
    }
}, {});

const Actor = sequelize.define('Actor', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING
    },
    date_of_birth: {
        type: DataTypes.DATE
    },
    award: {
        type: DataTypes.STRING
    },
    past_movie_id:{
        type: DataTypes.INTEGER
    }
}, {});

const Director = sequelize.define('Director', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING
    },
    date_of_birth: {
        type: DataTypes.DATE
    },
    award: {
        type: DataTypes.STRING
    },
    past_movie_id:{
        type: DataTypes.INTEGER
    }
}, {});

const main = async () => {
    const argv = yargs(hideBin(process.argv)).argv;

    try {
        await sequelize.authenticate();
        //console.log("Connection has been established");

        if (argv.add == 'film'){
            console.log('add film');
        }else if (argv.add == 'actor'){
            console.log('add actor');
        }else if (argv.add == 'director'){
            console.log('add director');
        }
e
        // await Director.sync({ alter: true });

        // if (argv.add && argv.name) {
            
        //     const { _, add, ...options } = {...argv};
        //     delete options['$0'];
        //     console.log(options);  

        //     const director = Director.build(options);
        //     await director.save();
        //     console.log(`Added: ${director.name}`);

        // }

       /* await Actor.sync({ alter: true });

        if (argv.add && argv.name) {

            const { _, add, ...options } = {...argv};
            delete options['$0'];
            console.log(options);  

            const actor = Actor.build(options);
            await actor.save();
            console.log(`Added: ${actor.name}`);

        }*/


        /*
        await Film.sync({ alter: true });

        if (argv.add && argv.title) {

            // console.log(argv.add);
            //console.log(argv.title);
            
            const { _, add, ...options } = {...argv};
            delete options['$0'];
            console.log(options);  

            //await addSong(argv.title);
            const film = Film.build(options);
            await film.save();
            console.log(`Added: ${film.title}`);

        }

        if (argv.show && argv.title) {
            const films = await Film.findAll({where: {title: argv.title}});
            //console.log(films);
            for (let film of films) {
                console.log(`Showing: ${film.title} ${film.lang}`);
            }
        }

        if (argv.remove && argv.title) {
            const films = await Film.destroy({where: {title: argv.title}});
            console.log(`Removed: ${films} film(s)`);
        }

        if (argv.edit && argv.title && argv.replace) {
            const films = await Film.update(
                {title: argv.replace},
                {where: {title: argv.title}}
            );        
            console.log(`Edited: ${films} film(s)`);
        }
        */
        

    } catch (error) {
        console.log("Connection failed");
    }

    await sequelize.close();
    process.exit();

};

main();

