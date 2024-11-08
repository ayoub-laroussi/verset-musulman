import { useState, useEffect } from "react";
import { storage } from './firebaseConfig.js';

const RandomImage = () => {
    const [images, setImages] = useState([]);
    const [image, setImage] = useState("");
    const [lastIndex, setLastIndex] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            const imagesRef = storage.ref().child('images'); // Chemin du dossier dans Firebase Storage
            const imageRefs = await imagesRef.listAll();

            const urls = await Promise.all(
                imageRefs.items.map((itemRef) => itemRef.getDownloadURL())
            );

            setImages(urls);
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
                        <img src="/logo/noorban.png" alt="Logo"/>
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
