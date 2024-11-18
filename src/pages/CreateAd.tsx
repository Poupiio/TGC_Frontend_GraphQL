import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify";
import { GET_ALL_CATEGORIES_AND_TAGS } from '../graphql/queries';
import { CREATE_AD } from '../graphql/mutations';
import { Category, Tag } from '../generated/graphql-types';

export type FormValues = {
   title: string
   description: string,
   category: number,
   price: number,
   picturesUrl: string[],
   location: string,
   adTags: string[],
   owner: string,
   createdAt: Date
}

const CreateAd = () => {
   const navigate = useNavigate();
   
   const { loading, error, data } = useQuery(GET_ALL_CATEGORIES_AND_TAGS);
   const [createNewAd] = useMutation(CREATE_AD);

   const { register, handleSubmit, formState: { errors }  } = useForm<FormValues>({defaultValues: {
      title: "Titre de mon annonce",
      description: "Description de mon annonce",
      category: 6,
      price: 10,
      picturesUrl: ["https://picsum.photos/200"],
      location: "Ma ville",
      owner: "C'est moi"
   }});
   
   const onSubmit: SubmitHandler<FormValues> = async (formData) => {
      try {
         console.log("tags à envoyer ", formData.adTags);
         const dataForBackend = {
            ...formData,
            createdAt: formData.createdAt + "T00:00:00.000Z",
            picturesUrl: formData.picturesUrl,
            adTags: formData.adTags ? formData.adTags : []
         };
         await createNewAd({
            variables: { data: dataForBackend }
         });

         toast.success("Annonce créée avec succès !");
         navigate("/");
      } catch (err) {
         console.error("Erreur lors de la création de l'annonce :", errors, err);
         toast.error("Une erreur est survenue !");
      }
   
   }

   
   if (loading) return 'Submitting...';
   if (error) return <p>Error in Categories: {error.message}</p>;

   return (
      <form
         method="post"
         className="form"
         onSubmit={handleSubmit(onSubmit)}
      >
         <label htmlFor="title">Quel est le titre de votre annonce ?
            <input className="text-field" type="text" {...register("title", { required: "Le titre est obligatoire" })} placeholder="Titre de l'annonce" />
         </label>
         
         <label htmlFor="description">Description
            <textarea className="text-field" {...register("description")} id="description" placeholder="Description..."></textarea>
         </label>
         
         <select className="text-field" {...register("category", { required: true })} id="category">
            <option value="">Choisissez une catégorie</option>
            {data.getAllCategories.map((category: Category) => (
               <option value={category.id} key={category.id}>{category.name}</option>
            ))}
         </select>
         
         <label htmlFor="price">Prix
            <input className="text-field" type="number" {...register("price", { required: true })} min="0" />
         </label>
         
         <label htmlFor="pictures">Entrez l'URL de votre image
            <input className="text-field" type="text" {...register("picturesUrl", {
               required: true,
               maxLength: { value: 2000, message: "Maximum 2000 characters" },
               })}
            />
         </label>

         <label htmlFor="location">Localisation
            <input className="text-field" type="text" {...register("location", { required: true })} placeholder="Paris" />
         </label>
         
         <h4>Souhaitez-vous ajouter un ou plusieurs tag(s) ?</h4>
         <div className="checkbox-container">
            {data.getAllTags.map((tag: Tag) => (
               <label key={tag.id} htmlFor={`${tag.id}`}>
                  <input className="checkbox" type="checkbox" id={`${tag.id}`} value={tag.id} {...register("adTags")} />{tag.name}
               </label>
            ))}
         </div>

         <label htmlFor="owner">Vendeur
            <input className="text-field" type="text" {...register("owner", { required: true })} placeholder="Votre nom" />
         </label>

         <label htmlFor="createdAt">Date d'ajout
            <input className="text-field" type="date" {...register("createdAt")} />
         </label>

         <button className="button create-ad" type="submit">Créer</button>
      </form>
   );
};

export default CreateAd;