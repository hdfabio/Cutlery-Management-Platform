import {Group, Mesh, MeshPhongMaterial, ObjectLoader} from 'three';
import MODEL from './Maquina1.json';

export default class Maquina1 extends Group {
	x = 0;
	y = 0;

	constructor(xp, yp) {

		super();
		this.x = xp;
		this.y = yp;
		const loader = new ObjectLoader();

		this.name = 'Maquina1';

		loader.parse(MODEL, (mesh) => {
			mesh.traverse(function (node) {
				if (node instanceof Mesh) {
					node.castShadow = true;
					node.receiveShadow = true;
					node.material = new MeshPhongMaterial({color: 0x143352, wireframe: false})
					node.position.z = yp;
					node.position.x = xp;
				}
			})

			this.add(mesh);
		});


	}
}
