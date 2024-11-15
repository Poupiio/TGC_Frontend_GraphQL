// import { useForm, SubmitHandler } from "react-hook-form";
// import { Fragment } from "react/jsx-runtime";
// import { ErrorMessage } from "@hookform/error-message";

// type Inputs = {
//    title: string
// }

// const CreateCategory = () => {
//    const {
//       register,
//       handleSubmit,
//       formState: { errors },
//    } = useForm<Inputs>({ criteriaMode: "all" });
   
//    return (
//       <>
//          <h1>Créer une catégorie</h1>
//          <form method="post" onSubmit={handleSubmit(onSubmit)}>
//             <label htmlFor="name">Nom de la catégorie
//                <input type="text" {...register("title", {
//                   minLength: { value: 2, message: "Le titre doit contenir au moins 2 caractères." },
//                   required: "Le titre est obligatoire",
//                   })} 
//                />
//             </label>
//             <ErrorMessage
//                errors={errors}
//                name="title"
//                render={({ messages }) =>
//                   messages &&
//                   Object.entries(messages).map(([type, message]) => {
//                      console.log(message);
//                      return (
//                         <Fragment key={type}>
//                            <br />
//                            <span className="error-message">{message}</span>
//                         </Fragment>
//                      );
//                   })
//                }
//             />

//             <button className="button" type="submit">Créer</button>
//          </form>
//       </>
//    );
// };

// export default CreateCategory;