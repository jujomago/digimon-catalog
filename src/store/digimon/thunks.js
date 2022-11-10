import { collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import unknowns from '../../data/unknowns.json'
import { db } from '../../firebase/config'
import { setData, setLoading, setSuccesMessage, setErrorMessage, setLoadingFavorites, setFavorites, setIsProcessingAdd, setIsProcessingDelete, setUserId } from './digimonSlice';

const localStorageKey = 'digimonData';
const apiUrl = 'https://www.digi-api.com/api/v1/digimon?pageSize=1500';
const colletionFavoritos = "favoritos";

const getDigimons = async () => {
    const unknownsIds = unknowns.map(item => item.id)
    try {
        const response = await fetch(apiUrl);
        const { content, pageable } = await response.json();

        const knowDigmons = content.filter(item => !unknownsIds.includes(item.id))

        const digimonsData = await Promise.all(
            knowDigmons.map(async (digimon) => {
                const respponse2 = await fetch(digimon.href);
                const data = await respponse2.json();
                return data;
            })
        );
        localStorage.setItem(localStorageKey, JSON.stringify(digimonsData));
        return digimonsData;
    } catch (e) {
        console.log(e);
    }
};

const addFavoriteKey = (data, favoritesIds) => {
    const newData = data.map(item => {
        if (favoritesIds.includes(item.id)) {
            return { ...item, isFavorite: true }
        }
        return { ...item, isFavorite: false }
    })
    return newData;
}

export const startLoadingDigimons = (uid) => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setUserId(uid))
    try {
        let favoritesIds = [];
        const querySpanshot = await getDocs(collection(db, colletionFavoritos));
        querySpanshot.forEach((doc) => {
            favoritesIds.push(doc.data().id);
        });

        if (!localStorage.getItem(localStorageKey)) {
            console.log('requesting first time');
            const data = await getDigimons();
            const newData = addFavoriteKey(data, favoritesIds);
            dispatch(setData(newData));
            return;
        }
        console.log('gettin from storage')
        const cachedDigimons = JSON.parse(localStorage.getItem(localStorageKey));
        const newData = addFavoriteKey(cachedDigimons, favoritesIds);
        dispatch(setData(newData));
    } catch (error) {
        console.log("hubo un error al cargar digimons", error);
    } finally {
        dispatch(setLoading(false));
    }
}
export const startLoadingFavorites = (uid) => async (dispatch) => {
    console.log('loading favorites for user:', uid);

    dispatch(setLoadingFavorites(true));
    try {
        let favoritesIds = [];
        const querySpanshot = await getDocs(collection(db, colletionFavoritos));
        querySpanshot.forEach((doc) => {
            //if (doc.data().uid === uid)
            favoritesIds.push(doc.data().id);
        });
        dispatch(setFavorites(favoritesIds))
    } catch (error) {
        dispatch(setErrorMessage())
        console.log("hubo un error al obtener de favoritos", error);
    } finally {
        dispatch(setLoadingFavorites(false));
    }
}


export const startAddingFavorite = (id, name, uid) => async (dispatch) => {
    console.log('adding farorite:', id);
    dispatch(setIsProcessingAdd({ id, value: true }));
    try {
        await setDoc(doc(db, colletionFavoritos, String(id)), {
            id,
            name,
            uid
        })
        dispatch(setSuccesMessage('Se Adiciono a Favoritos con exito'))
    } catch (error) {
        dispatch(setErrorMessage())
        console.log("hubo un error al agregar un favorito", error);
    } finally {
        dispatch(setIsProcessingAdd({ id, value: false }));
    }
}

export const startRemovingFAvorite = (id) => async (dispatch) => {
    console.log('removing farorite:', id);
    const docRef = doc(db, colletionFavoritos, String(id));
    dispatch(setIsProcessingDelete({ id, value: true }));
    try {
        await deleteDoc(docRef);
        dispatch(startLoadingFavorites())
        dispatch(setSuccesMessage('Se elimino con exito'))
    } catch (error) {
        dispatch(setErrorMessage())
        console.log("hubo un error al eliminar un favorito", error);
    } finally {
        dispatch(setIsProcessingDelete({ id, value: false }));
    }
}

