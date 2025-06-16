import {Group, Mesh, MeshPhongMaterial, ObjectLoader} from 'three';
import MODEL from './Maquina2.json';

export default class Maquina2 extends Group {
	constructor() {
		const loader = new ObjectLoader();

		super();

		this.name = 'Maquina2';

		loader.parse(MODEL, (mesh) => {
			mesh.traverse(function (node) {
				if (node instanceof Mesh) {
					node.castShadow = true;
					node.receiveShadow = true;
					node.material = new MeshPhongMaterial({color: 0x143352, wireframe: false})
				}
			})
			this.add(mesh);
		});
	}
}
