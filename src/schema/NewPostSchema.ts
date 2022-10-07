import * as Yup from "yup";

export const newPostValidationScheme = Yup.object({
  title: Yup.string().required("Oops, you need to name your blog post!").min(3, "Title must be at least 3 characters."),
  about: Yup.string().required("Oops, you need to write something about your blog post!").min(30, "About must be at least 30 characters."),
  content: Yup.string().required("Whoops, looks like your blog post is empty!").min(50, "Thats a really short blog post, try adding some more content!")
}).nullable();

export const newPostInitialValues = {
  title: "",
  about: "",
  content: ""
};