import {Group, Mesh, MeshPhongMaterial, ObjectLoader} from 'three';
import MODEL from './door.json';

export default class Door extends Group {
	constructor() {
		const loader = new ObjectLoader();

		super();

		this.name = 'door';

		loader.parse(MODEL, (mesh) => {
			mesh.traverse(function (node) {
				if (node instanceof Mesh) {
					node.castShadow = true;
					node.receiveShadow = true;
					node.material = new MeshPhongMaterial({color: 0xff30ff, wireframe: false})
				}
			})
			this.add(mesh);
		});
	}
}
