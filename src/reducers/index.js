import {combineReducers} from "redux";
//Auth
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
//GE
import encomendasReducer from "./ge/encomendasReducer";
import linhaProducaoReducer from "./mdf/linhaProducaoReducer";
//MDF
import maquinaReducer from "./mdf/maquinaReducer";
import operacoesReducer from "./mdf/operacoesReducer";
import tiposMaquinaReducer from "./mdf/tiposMaquinaReducer";
import planoFabricoReducer from "./mdp/planoFabricoReducer";
//MDP
import produtoReducer from "./mdp/produtoReducer";

export default combineReducers({
	maquinas: maquinaReducer,
	linhasProducao: linhaProducaoReducer,
	operacoes: operacoesReducer,
	tiposMaquina: tiposMaquinaReducer,

	produtos: produtoReducer,
	planosFabrico: planoFabricoReducer,

	encomendas: encomendasReducer,

	auth: authReducer,
	error: errorReducer
});
