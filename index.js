require('dotenv').config();

const { DataTypes } = require('sequelize');
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
    duration: {
        type: DataTypes.INTEGER
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 5 }
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
    past_movie_id: {
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
    past_movie_id: {
        type: DataTypes.INTEGER
    }
}, {});

const Member = sequelize.define('Member', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    membership: {
        type: DataTypes.STRING
    }
}, {});

const WatchHistory = sequelize.define('WatchHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
    /*memberid: {
        type: DataTypes.INTEGER,
         references: {
             model: Member,
             key: 'id'
         }
    },
    filmid: {
        type: DataTypes.INTEGER,
        references: {
            model: Film,
            key: 'id'
        }
    },*/
    isDisplay: {
        type: DataTypes.BOOLEAN,
        defaultValue: true        
    }
}, {});

Member.hasMany(WatchHistory);
WatchHistory.belongsTo(Member);
Film.hasMany(WatchHistory);
WatchHistory.belongsTo(Film);

// Member.belongsToMany(Film, { through: WatchHistory });
// Film.belongsToMany(Member, { through: WatchHistory });

const main = async () => {
    const argv = yargs(hideBin(process.argv)).argv;

    try {
        await sequelize.authenticate();
        console.log("Connection has been established");
        await sequelize.sync({ alter: true });
        console.log("All models were synchronized successfully.");


        // Membership functions
        // add membership
        // if (argv.register && argv.username && argv.password && argv.first_name
        //     && argv.last_name && argv.membership) {
        //     //node index.js --register --username 'marysmith' --password 'BBB123' --first_name 'Mary' --last_name 'smith' --email 'marys@xyz.com' --membership 'Basic'
        //     try {
        //         const { _, register, ...options } = { ...argv };
        //         delete options['$0'];
        //         console.log(options);

        //         const member = Member.build(options);
        //         console.log(member instanceof Member);
        //         await member.save();
        //         //const member = await Member.create(options);
        //         console.log(`Welcome ${member.first_name} ${member.last_name}, You registered Netflix sucessfully.`);
        //     } catch (error) {
        //         console.log('Failed to register. Please try again.');
        //     }

        // }

        // member login
        // if (argv.login && argv.username && argv.password) {
        //     //node index.js --login --username 'marysmith' --password 'BBB123'          
        //     const { _, login, ...options } = { ...argv };
        //     delete options['$0'];
        //     console.log(options);

        //     const member = await Member.findOne({ where: options });
        //     if (member === null) {
        //         console.log('Login failed. Please try again.');
        //     } else {
        //         console.log(member instanceof Member); // true
        //         console.log(`Welcome ${member.first_name} ${member.last_name} to Netflix!`);
        //     }
        // }

        // if (argv.add == 'film' && argv.title) {

        //     //await Film.sync({ alter: true });
        //     const { _, add, ...options } = { ...argv };
        //     delete options['$0'];
        //     console.log(options);

        //     const film = Film.build(options);
        //     console.log(film instanceof Film);
        //     await film.save();
        //     console.log(`Added: ${film.title}`);
        //     // node index.js --add 'film' --title 'Iron Man' --genre 'Action' --lang 'English' --year 2008 --duration 126 --quality 'Dolby SRD, DTS, SDDS'

        // } else if (argv.add == 'actor' && argv.name) {

        //     //await Actor.sync({ alter: true });

        //     const { _, add, ...options } = { ...argv };
        //     delete options['$0'];
        //     console.log(options);

        //     const actor = Actor.build(options);
        //     await actor.save();
        //     console.log(`Added: ${actor.name}`);
        //     //node index.js --add 'actor' --name 'Robert Downey Jr.' --gender 'M' --date_of_birth '1965-04-04' --past_movie_id 7

        // } else if (argv.add == 'director' && argv.name) {
        //     //await Director.sync({ alter: true });

        //     const { _, add, ...options } = { ...argv };
        //     delete options['$0'];
        //     console.log(options);

        //     const director = Director.build(options);
        //     await director.save();
        //     console.log(`Added: ${director.name}`);
        //     //node index.js --add 'director' --name 'Jon Favreau' --gender 'M' --date_of_birth '1966-10-19' --award '' --past_movie_id 8
        // }

        // Search film
        if (argv.show == 'film') {
            //await Film.sync({ alter: true });

            //node index.js --show 'film' --genre 'Action'
            //direct search
            if (argv.title || argv.genre || argv.lang || argv.quality) {
                const { _, show, ...options } = { ...argv };
                delete options['$0'];
                console.log(options);

                const amount = await Film.count({ where: options });
                if (amount > 0) {
                    const films = await Film.findAll({ where: options });
                    //console.log(films);
                    console.log(`Search result(s):`);
                    for (let film of films) {
                        console.log(`id:${film.id}  film: ${film.title} genre: ${film.genre} language: ${film.lang} year: ${film.year} duration: ${film.duration} rating: ${film.rating}`);
                    }
                    console.log(`${amount} records found.`);
                } else {
                    console.log(`No record found.`);
                }
            }
        }

        // Watch film, add History
        if (argv.watch == 'film') {
            // node index.js --watch 'film' --memberid 1 --filmid 1
            if (argv.memberid && argv.filmid) {
                // const { _, watch, ...options } = { ...argv };
                // delete options['$0'];
                // console.log(options);

                //const watchHistory = WatchHistory.build(options);
                const watchHistory = WatchHistory.build({
                    MemberId : argv.memberid,
                    FilmId : argv.filmid
                });
                await watchHistory.save();

                // const film = await Film.findByPk(argv.film_id);
                // console.log(`Watching: ${film.title}`);
            } else {
                console.log(`Failed to watch film`);
            }
        }

        // list Watch History
        if (argv.watch == 'history') {
            // node index.js --watch 'history' --memberid 1

            if (argv.memberid) {
                console.log(`Watch History:`);

                // const films = await Film.findAll({ 
                //     include: { 
                //         model: WatchHistory
                //     }                 
                // });

                //const wh = await Member.findAll({ include: WatchHistory});
                //const wh2 = await Film.findAll({ include: WatchHistory });
                //const wh = await Member.findAll({include: WatchHistory});
                const wh = await Member.findAll({
                    include: {
                      model: WatchHistory,
                      include: Film
                    }
                  });
                
                console.log(wh);

                // for (let w of wh2) {
                //      console.log(`id:${w.id} `);
                //  }


                // for (let film of films) {
                //     console.log(`id:${film.id}  film: ${film.title} genre: ${film.genre} language: ${film.lang} year: ${film.year} duration: ${film.duration} rating: ${film.rating}`);
                // }
            }

        }



        if (argv.remove && argv.title) {
            const films = await Film.destroy({ where: { title: argv.title } });
            console.log(`Removed: ${films} film(s)`);
        }

        if (argv.edit && argv.title && argv.replace) {
            const films = await Film.update(
                { title: argv.replace },
                { where: { title: argv.title } }
            );
            console.log(`Edited: ${films} film(s)`);
        }



    } catch (error) {
        console.log(error);
    }

    //await sequelize.close();   
    process.exit();
};

main();


