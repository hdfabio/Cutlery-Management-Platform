import {Group, Mesh, MeshPhongMaterial, ObjectLoader} from 'three';
import MODEL from './Chao.json';


export default class Chao extends Group {
	constructor() {
		const loader = new ObjectLoader();

		super();
		this.name = 'Chao';

		loader.parse(MODEL, (mesh) => {
			mesh.traverse(function (node) {
				if (node instanceof Mesh) {
					node.castShadow = true;
					node.receiveShadow = true;
					node.material = new MeshPhongMaterial({color: 0xff3fff, wireframe: false})
				}
			})
			this.add(mesh);
		});
	}
}
