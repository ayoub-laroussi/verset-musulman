import { useState, useEffect } from "react";
import { storage } from './firebaseConfig.js';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import NoorLogo from "public/Noor-2.svg";

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
        if (images.length > 0) {
            let randomIndex;

            do {
                randomIndex = Math.floor(Math.random() * images.length);
            } while (randomIndex === lastIndex);

            setImage(images[randomIndex]);
            setLastIndex(randomIndex);
        }
    }, [images, lastIndex]);


    return (
        <main>
            <div className="p-4 flex justify-center items-center flex-col ">
                {/* Icône placée avant l'image principale */}
                <a href="https://noor-iqra.fr/">
                    <figure className="w-200 h-200">
                        <img src={NoorLogo} alt="Logo"/>
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
