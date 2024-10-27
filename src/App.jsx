import { useState, useEffect } from "react";
import { storage } from './firebaseConfig.js';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import "./index.css"

const RandomImage = () => {
    const [images, setImages] = useState([]);
    const [image, setImage] = useState("");
    const [lastIndex, setLastIndex] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            const imagesRef = ref(storage, 'images'); // Chemin du dossier dans Firebase Storage
            const imageRefs = await listAll(imagesRef);

            const urls = await Promise.all(
                imageRefs.items.map((itemRef) => getDownloadURL(itemRef))
            );

            setImages(urls);
        };

        fetchImages();
    }, []);

    // Sélectionner une image au hasard une fois les URLs chargées
    useEffect(() => {
        if (images.length > 0) { // Vérifier si les images sont chargées
            let randomIndex;

            // Assurer que le nouvel index est différent du dernier
            do {
                randomIndex = Math.floor(Math.random() * images.length);
            } while (randomIndex === lastIndex);

            setImage(images[randomIndex]);
            setLastIndex(randomIndex);
        }
    }, [images]);

    return (
        <main className="bg-emerald-50 h-screen flex items-center justify-center">
            <div className="bg-emerald-900 shadow-lg p-8 flex justify-center items-center flex-col">
                <h1 className="font-bold text-emerald-100 mb-4">Image du jour</h1>
                {image && (
                    <img src={image} alt="Image aléatoire" className="w-128  max-h-1xl object-cover" />
                )}
            </div>
        </main>
    );
};

export default RandomImage;
