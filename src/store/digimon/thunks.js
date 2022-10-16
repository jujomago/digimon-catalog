


import { collection, addDoc, getDocs, deleteDoc, doc, where } from "firebase/firestore";
import unknowns from '../../data/unknowns.json'
import { db } from '../../firebase/config'
import { setData, setLoading, setLoadingFavorite, setSuccesMessage, setErrorMessage, setLoadingFavorites, setFavorites, setIsProcessing, setIsProcessingAdd, setIsProcessingDelete } from './digimonSlice';

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

const addFavoriteKey = (data, favoritesIds) => {
    const newData = data.map(item => {
        if (favoritesIds.includes(item.id)) {
            return { ...item, isFavorite: true }
        }
        return { ...item, isFavorite: false }
    })
    return newData;
}

export const startLoadingDigimons = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        let favoritesIds = [];
        const querySpanshot = await getDocs(collection(db, "favoritos"));
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
    dispatch(setIsProcessingAdd({ id, value: true }));
    try {

        await addDoc(collection(db, "favoritos"), { id });

        dispatch(setSuccesMessage())
    } catch (error) {
        dispatch(setErrorMessage())
        console.log("hubo un error al agregar un favorito", error);
    } finally {
        dispatch(setIsProcessingAdd({ id, value: false }));
    }
}

export const startRemovingFAvorite = (id) => async (dispatch) => {
    console.log('removing farorite:', id);
    const docRef = doc(db, 'favoritos', String(id));
    dispatch(setIsProcessingDelete({ id, value: true }));
    try {
        //doc(db,'favoritos',)
        //await db.collection("favoritos").doc(id).delete();
        await deleteDoc(docRef);
        //dispatch(startLoadingFavorites())
        dispatch(setSuccesMessage())
    } catch (error) {
        dispatch(setErrorMessage())
        console.log("hubo un error al eliminar un favorito", error);
    } finally {
        dispatch(setIsProcessingDelete({ id, value: false }));
    }
}

