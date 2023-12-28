
import { collection, addDoc, getFirestore, getDocs, deleteDoc, doc} from "firebase/firestore"; 
import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyDTskGlKpWDiL0pVrENKkEL75SmT4f9Alk",
  authDomain: "post-3054b.firebaseapp.com",
  projectId: "post-3054b",
  storageBucket: "post-3054b.appspot.com",
  messagingSenderId: "527430765954",
  appId: "1:527430765954:web:eb9a714cac5f285426d39b"
};


const Fb = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(Fb);

console.log(Fb);

export async function createPost (newPost) {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
        title: newPost.title,
        text: newPost.text,
        data: newPost.data,               
    });
    console.log("Document written with ID: ", docRef.id);    
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getPost () {
  const postsFirebase = await getDocs(collection(db, "posts"));
  const postsData = [];
  
  postsFirebase.forEach((post) => {    
    postsData.push({
        title: post.data().title,
        text: post.data().text,
        data: post.data().data,
        id: post.id,
    });    
    console.log(postsData)
  });  
  // Сортировка массива по полю date
  postsData.sort((a, b) => a.data < b.data ? 1:-1);
  console.log(postsData)
  return postsData; 
}

export async function deletePost (id) {
    const postRef = doc(db, "posts", id);
    try {
        await deleteDoc(postRef);
    } catch {
        console.log ('ошибка удаления поста')
    }
    
}

