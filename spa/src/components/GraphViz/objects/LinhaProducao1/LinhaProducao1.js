import {Group, Mesh, MeshPhongMaterial, ObjectLoader} from 'three';
import MODEL from './LinhaProducao1.json';

export default class LinhaProducao1 extends Group {
	x = 0;
	y = 0;
	mesh = null;

	constructor(xp, yp) {
		const loader = new ObjectLoader();

		super();
		this.x = xp;
		this.y = yp;
		this.name = 'LinhaProducao';

		loader.parse(MODEL, (mesh) => {
			mesh.traverse(function (node) {
				if (node instanceof Mesh) {
					node.castShadow = true;
					node.receiveShadow = true;
					node.material = new MeshPhongMaterial({color: 0x333333, wireframe: false});
					node.position.z = yp;
					node.position.x = xp;
				}
			});
			this.add(mesh);
			this.mesh = mesh;
		});

	}

	getMesh = () => {
		return this.mesh;
	}
}
