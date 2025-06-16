import {Group, Mesh, MeshPhongMaterial, ObjectLoader} from 'three';
import MODEL from './LinhaProducao2.json';

export default class LinhaProducao2 extends Group {
	constructor() {
		const loader = new ObjectLoader();

		super();

		this.name = 'LinhaProducao2';

		loader.parse(MODEL, (mesh) => {
			mesh.traverse(function (node) {
				if (node instanceof Mesh) {
					node.castShadow = true;
					node.receiveShadow = true;
					node.material = new MeshPhongMaterial({color: 0x333333, wireframe: false})
				}
			})
			this.add(mesh);
		});
	}
}
