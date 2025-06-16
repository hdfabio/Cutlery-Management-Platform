import {DirectionalLight, HemisphereLight, PerspectiveCamera, Vector3} from "three";


export function createCamera(width, height) {
	const fov = 75; // fov = Field Of View
	const aspect = width / height;
	const near = 1;
	const far = 1000;

	const camera = new PerspectiveCamera(fov, aspect, near, far);

	camera.position.set(-100, 80, 50);
	camera.lookAt(new Vector3(0, 0, 0));
	return camera;
}

export function createLights(scene) {
	const ambientLight = new HemisphereLight(
		0xddeeff, // sky color
		0x202020, // ground color
		5, // intensity
	);

	const mainLight = new DirectionalLight(0xffffff, 5);
	mainLight.position.set(10, 10, 10);

	scene.add(ambientLight, mainLight);

	return scene;
}
