import {BoxGeometry, Group, Mesh, MeshPhongMaterial} from 'three';

export default class Produto extends Group {
	x = 0;
	y = 0;
	renderer = null;

	scene = null;
	camera = null;
	mesh = null;

	constructor(xp, yp) {

		super();
		this.x = xp;
		this.y = yp;

		this.name = "produto";

		var produto = new Mesh(new BoxGeometry(2, 1, 2, 30),
			new MeshPhongMaterial({color: 0xff0f0f, wireframe: false}));
		produto.position.y = 3;
		produto.position.x = xp;
		produto.position.z = yp;
		this.mesh = produto;
		this.add(produto);

	}


	getMesh = () => {
		return this.mesh;
	}
}
