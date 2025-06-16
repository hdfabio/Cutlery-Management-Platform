import {Group, Mesh, MeshPhongMaterial, PlaneGeometry} from 'three';

export default class ChaoDinamico extends Group {
	distancia = 0;

	constructor(distancia, profundidade) {

		super();
		this.name = "ChaoDinamico";
		this.distancia = distancia;
		var mesh = new Mesh(
			new PlaneGeometry(30 + profundidade, this.distancia + 10 + 21, 10, 10),
			new MeshPhongMaterial({color: 0xffffff, wireframe: false})
		);
		mesh.rotation.x -= Math.PI / 2;
		mesh.position.x += profundidade / 2;
		mesh.receiveShadow = true;
		mesh.position.y += 1;
		mesh.receiveShadow = true;
		mesh.castShadow = true;
		this.add(mesh);

	}


}
