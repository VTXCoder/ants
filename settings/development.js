
exports.settings={
	baseDir:__dirname+'/../',
	siteName:'Ant.hm',
	port:3999,
	//sessionManagement:'redis',
	domain:'localhost',
	lang:'en',

	// Postgres
	postgres: {
		driver: "pg",
      	user: "antytime",
      	password: "antytime",
      	host: "localhost",
      	database: "antytime"
	},
	handlersFolder: __dirname+"./../controllers",

	cdn: "/game/",

	social:{

	},

	sessionManagement: 'mongo',

	mongodb: { 
		db: 'ant',
	    host: 'melia',
	    port: 27017,
	    username: null,
	    password: null,
	    auto_reconnect: true
	}

}

