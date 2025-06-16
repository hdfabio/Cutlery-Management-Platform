const env = process.env.NODE_ENV;

const prod = {
	mdf: "http://wvm015.dei.isep.ipp.pt/mdf/api/",
	mdp: "http://wvm015.dei.isep.ipp.pt/mdp/api/",
	ge: "http://wvm015.dei.isep.ipp.pt/ge/api/",
};

const dev = {
	mdf: "https://localhost:5001/api/",
	mdp: "http://localhost:5000/api/",
	ge: "http://localhost:5002/api/"
};

let environment;
switch (env) {
	case "development":
		environment = dev;
		break;
	case "production":
		environment = prod;
		break;
	default:
		environment = dev;
		break;
}

function url(server, endpoint) {
	switch (server) {
		case "mdf":
			return environment.mdf + endpoint + '/';

		case "mdp":
			return environment.mdp + endpoint + '/';

		case "ge":
			return environment.ge + endpoint + '/';

		default:
			break;
	}
}

module.exports = url;
