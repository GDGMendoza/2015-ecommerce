var config = {
	db: {
		uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mean-dev',
		options: {
			user: '',
			pass: ''
		},
		// Habilitar el modo debug para mongodb
		debug: process.env.MONGODB_DEBUG || false
	}
}

export {config as default};