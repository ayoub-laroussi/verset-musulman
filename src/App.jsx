import { useState, useEffect } from "react";
import { storage } from './firebaseConfig.js';
import { ref, listAll, getDownloadURL } from "firebase/storage";

const RandomImageWithAudio = () => {
    const [media, setMedia] = useState([]);
    const [current, setCurrent] = useState({ image: "", audio: null });
    const [lastIndex, setLastIndex] = useState(null);

    useEffect(() => {
        const fetchAllMedia = async () => {
            const rootRef = ref(storage, ''); // Référence de la racine du storage
            const folderRefs = await listAll(rootRef); // Liste tous les dossiers à la racine
            const allMedia = [];

            for (let folderRef of folderRefs.prefixes) { // prefixes contient les sous-dossiers
                const folderMedia = await fetchMediaFromFolder(folderRef);
                allMedia.push(...folderMedia);
            }

            setMedia(allMedia);
        };

        const fetchMediaFromFolder = async (folderRef) => {
            const files = await listAll(folderRef);
            const images = [];
            let audioUrl = null;

            for (let file of files.items) {
                const fileUrl = await getDownloadURL(file);
                if (file.name.endsWith('.mp3')) {
                    audioUrl = fileUrl; // le son associé à toutes les images de ce dossier
                } else {
                    images.push({ image: fileUrl, audio: audioUrl });
                }
            }
            return images;
        };

        fetchAllMedia();
    }, []);

    useEffect(() => {
        if (media.length > 0) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * media.length);
            } while (randomIndex === lastIndex);

            setCurrent(media[randomIndex]);
            setLastIndex(randomIndex);
        }
    }, [media]);

    return (
        <main className="bg-slate-50 h-screen flex items-center justify-center">
            <div className="bg-slate-300 shadow-lg p-8 flex justify-center items-center flex-col">
                <h1 className="text-gray-800 text-bold mb-4">Verset du Coran</h1>
                {current.image && (
                    <img src={current.image} alt="Verset aléatoire" className="w-128 h-128 object-cover" />
                )}
                {current.audio && (
                    <audio controls src={current.audio} className="mt-4">
                        Votre navigateur ne supporte pas lélément audio.
                    </audio>
                )}
            </div>
        </main>
    );
};

export default RandomImageWithAudio;
