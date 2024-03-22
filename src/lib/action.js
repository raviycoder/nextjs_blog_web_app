"use server";
import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";

export const addPost = async (prevState, formData) => {
  //    const title = formData.get("title");
  //    const desc = formData.get("desc");
  //    const slug = formData.get("slug");

  const { title, desc, slug, userId, img } = Object.fromEntries(formData);
  console.log(" ye raha", title, desc, slug, userId);

  try {
    connectToDb()
    const newPost = new Post({
      title,
      img,
      desc,
      slug,
      userId,
    });
    await newPost.save();
    console.log("SAVE TO DB");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
export const editPost = async (prevState, formData) => {
  //    const title = formData.get("title");
  //    const desc = formData.get("desc");
  //    const slug = formData.get("slug");
  const { title, desc, slug, userId, img, id } = Object.fromEntries(formData);
  console.log(" ye raha", title, desc, slug, userId, img, id);

  const updateData = await {
    title, img, desc, slug}

  try {
    await connectToDb()
    const newPost = await Post.findByIdAndUpdate(id, updateData, {new:true, revalidatePath:true});
    console.log("Update TO DB", newPost);
    revalidatePath("/blog");
    revalidatePath("/admin");
    return {success:true}
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deletePost = async (formData) => {
  //    const title = formData.get("title");
  //    const desc = formData.get("desc");
  //    const slug = formData.get("slug");

  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();
    await Post.findByIdAndDelete(id);
    console.log("deleted from db", id);
    revalidatePath("/blog");
    revalidatePath("/admin");
    window.location.href = '/admin';
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
export const addUser = async (previousState, formData) => {
  //    const title = formData.get("title");
  //    const desc = formData.get("desc");
  //    const slug = formData.get("slug");

  const { username, email, password, image } = Object.fromEntries(formData);

  try {
    connectToDb()
    const newUser = new User({
      username,
      email,
      password,
      image,
    });
    await newUser.save();
    console.log("SAVE TO DB");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();
    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};
export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, passwordConfirm, image } =
    Object.fromEntries(formData);

  if (password !== passwordConfirm) {
    return { error: "Passwords do not match!" };
  }

  try {
    connectToDb();
    const user = await User.findOne({ email: email });
    if (user) {
      return { error: "User already exists!" };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });
    await newUser.save();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
export const login = async (previousState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    console.log(error);
    if(error.message.includes("CredentialsSignin")){
      return { error: "Invalid email or password!" }
    }
    throw error;
  }
};
