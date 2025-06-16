import {Group, ObjectLoader} from 'three';
import MODEL from './Faca.json';

export default class Faca extends Group {
	constructor() {
		const loader = new ObjectLoader();

		super();

		this.name = 'Faca';

		loader.parse(MODEL, (mesh) => {
			this.add(mesh);
		});
	}
}
