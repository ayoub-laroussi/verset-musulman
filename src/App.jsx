import { useState, useEffect } from "react";
import { storage } from './firebaseConfig.js';
import { ref, listAll, getDownloadURL } from "firebase/storage";


const RandomImage = () => {
    const [images, setImages] = useState([]);
    const [image, setImage] = useState("");
    const [lastIndex, setLastIndex] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesRef = ref(storage, 'images'); // Utilise `ref` pour le dossier "images"
                const imageRefs = await listAll(imagesRef);

                const urls = await Promise.all(
                    imageRefs.items.map((itemRef) => getDownloadURL(itemRef))
                );

                console.log("Images chargées :", urls); // Debug : vérifier les images récupérées
                setImages(urls);
            } catch (error) {
                console.error("Erreur lors du chargement des images :", error);
            }
        };


        fetchImages();
    }, []); // Exécuter uniquement au premier rendu

    useEffect(() => {
        if (images.length > 0) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * images.length);
            } while (randomIndex === lastIndex);

            setImage(images[randomIndex]);
            setLastIndex(randomIndex);
        }
    }, [images]); // Ce useEffect se déclenche seulement lorsque `images` est modifié


    return (
        <main>
            <div className="p-4 flex justify-center items-center flex-col ">
                {/* Icône placée avant l'image principale */}
                <a href="https://noor-iqra.fr/">
                    <figure className="w-32">
                        <img src="../public/noorban.png" alt="Logo"/>
                    </figure>
                </a>
                {/* Image principale */}
                {image && (
                    <figure>
                        <img src={image} alt="Image aléatoire" className="p-10 w-128 h-128"/>
                    </figure>
                )}
            </div>
        </main>

    );
};

export default RandomImage;
