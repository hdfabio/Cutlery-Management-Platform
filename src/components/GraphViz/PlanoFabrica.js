import React, {Component} from "react";
import {connect} from "react-redux";
import {Clock, MeshPhongMaterial, Raycaster, Scene, Vector2, Vector3} from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import AdicionarLinhaProducao from "../Dashboard/MDF/LinhasProducao/AdicionarLinhaProducao";
import ChaoDinamico from "./objects/Chao/ChaoDinamico";
import LinhaProducao1 from "./objects/LinhaProducao1/LinhaProducao1";
import Maquina from "./objects/Maquina1/Maquina1";
import ParedeDinamica from "./objects/Parede1/ParedeDinamica";
import Produto from "./objects/Parede1/Produto";
import {createRenderer} from "./Rendering";
import {createCamera, createLights} from "./Scene";

const OFFSET_WIDTH = 350;
const OFFSET_HEIGHT = 300;

class PlanoFabrica extends Component {
	state = {
		height: window.innerHeight - OFFSET_HEIGHT,
		width: window.innerWidth - OFFSET_WIDTH
	};
	objetos = [];
	produtos = [];
	primeiraMaquina = -10;
	primeiraMaquina1 = -10;
	intersects = null;
	raycaster = new Raycaster();
	mouse = new Vector2();
	container = null;
	tempV = new Vector3();
	stats = null;
	clock = new Clock();

	canvas = null;
	scene = null;
	elem = null;

	keyboard = {};

	distanciaPrecisa = 0;
	distanciaEspacoParede = 10;
	distanciaAumentar = 21;
	posicaoParede = 15.6;

	clicked = true;
	labelContainerElem = null;
	somaProfundidade = 1;
	alternar = true;

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleWindowResize);
		window.cancelAnimationFrame(this.requestID);
		this.controls.dispose();
	}

	componentDidMount() {
		this.scene = new Scene();

		this.canvas = document.querySelector('#c');
		this.labelContainerElem = document.querySelector('#labels');
		this.scene = createLights(this.scene);
		this.sceneSetup();

		window.addEventListener("resize", this.handleWindowResize);
		window.addEventListener('keydown', this.keyDown);
		window.addEventListener('keydown', this.keyUp);
		window.addEventListener('click', this.reload);
		window.addEventListener('mousemove', this.onMouseMove, false);

		this.startAnimationLoop();
	}

	toggleSwitch = () => {
		this.alternar = !this.alternar;
	};

	reload = () => {
		if (this.clicked) {
			this.scene = this.createMaquinas(this.scene);
			this.clicked = false;
		}
	};

	keyDown = (event) => {
		this.keyboard[event.keyCode] = true;

		if (event.keyCode === 82) {
			this.reload();
		}
	};

	keyUp = (event) => {
		this.keyboard[event.keyCode] = false;
	};

	onMouseMove = (event) => {
		this.reload();
		// calculate mouse position in normalized device coordinates
		// (-1 to +1) for both components

		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		this.raycaster.setFromCamera(this.mouse, this.camera);

		// calculate objects intersecting the picking ray

		this.intersects = this.raycaster.intersectObjects(this.scene.children);

		for (let i = 0; i < this.intersects.length; i++) {
			this.intersects[i].object.material.color.set(0xff0f00);
		}
	};

	sceneSetup = () => {
		// get container dimensions and use them for scene sizing
		const {width, height} = this.state;

		this.camera = createCamera(width, height); // is used here to set some distance from a cube that is located
		this.renderer = createRenderer(width, height, this.canvas);

		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.target = new Vector3(0, 15, 0);
		this.controls.update();
		this.controls.maxPolarAngle = Math.PI / 2;
	};

	startAnimationLoop = () => {
		const {width, height} = this.state;

		this.objetos.map(objeto => {
			objeto.linha.updateWorldMatrix(true, false);
			objeto.linha.getWorldPosition(this.tempV);
			this.tempV.project(this.camera);

			const x = (this.tempV.x * .5 + .5) * width;
			const y = (this.tempV.y * -.5 + .5) * height;
			// move the elem to that position
			objeto.elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
			return null;
		});
		if (this.produtos != null || this.produtos.length !== 0) {
			this.produtos.map(produto => {

				for (const pos of produto.posicoes) {
					if (pos > produto.produto.position.x + 0.1) {
						produto.produto.material = new MeshPhongMaterial({color: Math.random() * 0xFFFFFF << 0, wireframe: false});
					} else {
						produto.produto.material = new MeshPhongMaterial({color: 0xff0f0f, wireframe: false})
					}
				}
				if (produto.produto.position.x <= -10) {
					produto.produto.position.x -= -20;
				}
				produto.produto.position.x -= 0.1;
				return null;
			})
		}

		this.renderer.render(this.scene, this.camera);
		this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
	};

	handleWindowResize = () => {
		const height = window.innerHeight - OFFSET_HEIGHT;
		const width = window.innerWidth - OFFSET_WIDTH;

		this.setState({
			height: height,
			width: width
		});

		this.renderer.setSize(width, height);
		this.camera.aspect = width / height;

		// Note that after making changes to most of camera properties you have to call
		// .updateProjectionMatrix for the changes to take effect.
		this.camera.updateProjectionMatrix();
	};

	resetPlan = (scene) => {
		if (scene.getObjectByName("ParedeDinamica") != null) {
			scene.remove(scene.getObjectByName("ChaoDinamico"));
			scene.remove(scene.getObjectByName("ParedeDinamica"))
		}

		scene.add(new ParedeDinamica(this.posicaoParede, this.distanciaPrecisa, this.somaProfundidade));
		scene.add(new ChaoDinamico(this.distanciaPrecisa, this.somaProfundidade));
		return scene;
	};

	createMaquinas = (scene) => {
		const {linhasProducao} = this.props.linhasProducao;
		const distanciaEntreMaquinas = 21;

		let distancia1 = 21;
		let distancia2 = 0;


		for (let lp of linhasProducao) {

			if (!(lp !== undefined && lp.linhaProducaoMaquinas != null)) {
				continue;
			}

			//scene = this.resetPlan(scene);

			let linha = null;
			if (this.alternar) {
				linha = new LinhaProducao1(1, distancia1);
				let listaPosicoes = [];
				let cont = 0;
				// eslint-disable-next-line no-unused-vars
				for (let lpm of lp.linhaProducaoMaquinas) {
					scene.add(new Maquina(this.primeiraMaquina, distancia1));

					if (cont % 6 === 0 && cont !== 0) {
						this.somaProfundidade += 15;
						scene.add(new LinhaProducao1(this.primeiraMaquina, distancia1))
					}
					listaPosicoes.push(this.primeiraMaquina);
					cont++;
					this.primeiraMaquina += 4;

				}

				scene.add(linha);
				let produto = new Produto(1, distancia1 - 10);
				scene.add(produto);
				this.produtos.push({produto: produto.getMesh(), posicoes: listaPosicoes});
				this.primeiraMaquina = -this.distanciaEspacoParede;

				this.toggleSwitch();

				distancia1 += distanciaEntreMaquinas;
			} else {
				linha = new LinhaProducao1(1, -distancia2);
				var listaPosicoes = [];
				var cont = 0;
				// eslint-disable-next-line no-unused-vars
				for (let lpm of lp.linhaProducaoMaquinas) {
					scene.add(new Maquina(this.primeiraMaquina1, -distancia2));
					listaPosicoes.push(this.primeiraMaquina1);

					this.primeiraMaquina1 += 4;

					if (cont % 6 === 0 && cont !== 0) {
						this.somaProfundidade += 15;
						scene.add(new LinhaProducao1(this.primeiraMaquina1, -distancia2))
					}
					cont++;
				}
				scene.add(linha);
				var produto = new Produto(1, -distancia2 - 10);
				scene.add(produto);
				this.produtos.push({produto: produto.getMesh(), posicoes: listaPosicoes});
				this.toggleSwitch();

				distancia2 += this.distanciaAumentar;
				this.primeiraMaquina1 = -this.distanciaEspacoParede;
			}
			this.distanciaPrecisa += this.distanciaAumentar;
			this.posicaoParede += this.distanciaAumentar / 2;
			scene = this.resetPlan(scene);
			this.domElemCreator(lp, linha);
		}
		return scene;
	};

	domElemCreator = (linhaProducao, obj) => {
		let elem = document.createElement('div');
		elem.textContent = linhaProducao.descricao.value;

		this.labelContainerElem.appendChild(elem);

		this.objetos.push({linha: obj.getMesh(), elem: elem});
	};

	render() {
		return (

			<div id="container">
				<canvas id="c" ref="cref"/>
				<div id="labels" ref="lref">
					<AdicionarLinhaProducao/>

				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		maquinas: state.maquinas,
		linhasProducao: state.linhasProducao
	}
}

export default connect(mapStateToProps, null)(PlanoFabrica)
