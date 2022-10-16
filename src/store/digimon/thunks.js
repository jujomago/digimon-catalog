


import { collection, addDoc, getDocs, deleteDoc, doc, where } from "firebase/firestore";
import unknowns from '../../data/unknowns.json'
import { db } from '../../firebase/config'
import { setData, setLoading, setLoadingFavorite, setSuccesMessage, setErrorMessage, setLoadingFavorites, setFavorites } from './digimonSlice';

const localStorageKey = 'digimonData';
const apiUrl = 'https://www.digi-api.com/api/v1/digimon?pageSize=1500';

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

export const startLoadingDigimons = () => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(startLoadingFavorites())
    try {
        if (!localStorage.getItem(localStorageKey)) {
            console.log('requesting first time');
            const data = await getDigimons();
            dispatch(setData(data));
            return;
        }
        console.log('gettin from cachee')
        const cachedDigimons = JSON.parse(localStorage.getItem(localStorageKey));
        dispatch(setData(cachedDigimons));
    } catch (error) {
        console.log("hubo un error al cargar digimons", error);
    } finally {
        dispatch(setLoading(false));
    }
}
export const startLoadingFavorites = () => async (dispatch) => {
    console.log('loading favorites');

    dispatch(setLoadingFavorites(true));
    try {
        let favoritesIds = [];
        const querySpanshot = await getDocs(collection(db, "favoritos"));
        querySpanshot.forEach((doc) => {
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


export const startAddingFavorite = (id) => async (dispatch) => {
    console.log('adding farorite:', id);
    dispatch(setLoadingFavorite(true));
    try {

        await addDoc(collection(db, "favoritos"), { id });
        dispatch(startLoadingFavorites())
        dispatch(setSuccesMessage())
    } catch (error) {
        dispatch(setErrorMessage())
        console.log("hubo un error al agregar un favorito", error);
    } finally {
        dispatch(setLoadingFavorite(false));
    }
}

export const startRemovingFAvorite = (id) => async (dispatch) => {
    console.log('removing farorite:', id);
    const colRef = collection(db, 'favoritos');
    dispatch(setLoadingFavorite(true));
    try {
        //doc(db,'favoritos',)
        await deleteDoc(doc(db, 'favoritos', where('id', "==", id)));
        dispatch(setSuccesMessage())
    } catch (error) {
        dispatch(setErrorMessage())
        console.log("hubo un error al eliminar un favorito", error);
    } finally {
        dispatch(setLoadingFavorite(false));
    }
}

