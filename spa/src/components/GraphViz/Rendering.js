import {WebGLRenderer} from "three";

export function createRenderer(width, height, canvas) {
	let renderer = new WebGLRenderer({antialias: true, canvas});

	renderer.setSize(width, height);

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setClearColor(0x7ec0ee, 1);

	renderer.gammaFactor = 2.2;
	renderer.gammaOutput = true;

	renderer.physicallyCorrectLights = true;

	return renderer;
}
