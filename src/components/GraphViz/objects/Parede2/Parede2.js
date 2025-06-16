import {Group, Mesh, MeshPhongMaterial, ObjectLoader} from 'three';
import MODEL from './Parede2.json';

export default class Parede2 extends Group {
	constructor() {
		const loader = new ObjectLoader();

		super();
		this.name = 'Parede2';

		loader.parse(MODEL, (mesh) => {
			mesh.traverse(function (node) {
				if (node instanceof Mesh) {
					node.material = new MeshPhongMaterial({color: 0x330000, wireframe: false})
				}
			})
			this.add(mesh);
		});
	}
}
