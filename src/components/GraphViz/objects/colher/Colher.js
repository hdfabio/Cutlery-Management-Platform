import {Group, ObjectLoader} from 'three';
import MODEL from './tsconfig.json';

export default class Colher extends Group {
	constructor() {
		const loader = new ObjectLoader();

		super();

		this.name = 'Colher';

		loader.parse(MODEL, (mesh) => {
			this.add(mesh);
		});
	}
}
