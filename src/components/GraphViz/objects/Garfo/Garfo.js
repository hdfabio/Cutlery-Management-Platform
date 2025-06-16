import {Group, ObjectLoader} from 'three';
import MODEL from './Garfo.json';

export default class Garfo extends Group {
	constructor() {
		const loader = new ObjectLoader();

		super();

		this.name = 'Garfo';

		loader.parse(MODEL, (mesh) => {
			this.add(mesh);
		});
	}
}
