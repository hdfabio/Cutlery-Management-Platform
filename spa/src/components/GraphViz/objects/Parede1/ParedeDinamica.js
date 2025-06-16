import {DoubleSide, Group, Mesh, MeshPhongMaterial, PlaneGeometry} from 'three';

export default class ParedeDinamica extends Group {
	distancia = 0;

	constructor(distancia, atras, profundidade) {

		super();
		this.name = "ParedeDinamica";
		this.distancia = distancia;
		var inicial = new Mesh(new PlaneGeometry(30.5 + profundidade, 20, 10),
			new MeshPhongMaterial({color: 0xffff0f, wireframe: false, side: DoubleSide}));

		inicial.position.z = distancia;
		inicial.position.y = 10.5;
		inicial.position.x += profundidade / 2;

		var inicial2 = new Mesh(new PlaneGeometry(30.5 + profundidade, 20, 10),
			new MeshPhongMaterial({color: 0xffff0f, wireframe: false, side: DoubleSide}));

		inicial2.position.z = -distancia;
		inicial2.position.y = 10.5;
		inicial2.position.x += profundidade / 2;

		var inicial1 = new Mesh(new PlaneGeometry(32 + atras, 20, 10),
			new MeshPhongMaterial({color: 0xffff0f, wireframe: false, side: DoubleSide}));
		inicial1.rotateY(Math.PI / 2);
		inicial1.position.x = 15 + profundidade;
		inicial1.position.y = 10.5;


		this.add(inicial);
		this.add(inicial2);
		this.add(inicial1)
	}


}
