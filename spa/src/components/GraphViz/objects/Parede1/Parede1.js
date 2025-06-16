import {Group, Mesh, MeshPhongMaterial, ObjectLoader} from 'three';
import MODEL from './Parede1.json';

export default class Parede1 extends Group {
	constructor() {
		const loader = new ObjectLoader();

		super();
		this.name = 'Parede1';

		loader.parse(MODEL, (mesh) => {
			mesh.traverse(function (node) {
				if (node instanceof Mesh) {
					node.castShadow = true;
					node.receiveShadow = true;
					node.material = new MeshPhongMaterial({color: 0xffffff, wireframe: false})
				}
			})
			this.add(mesh);
		});
	}
}
