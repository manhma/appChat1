import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "./config";

//them du lieu ma documentName duoc random
export const addData1 = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addData = async (collectionName, data) => {
  const docRef = await addDoc(collection(db, collectionName), data);
};

///them du lieu ma documentName tu minh dat

export const addData2 = async (collectionName, documentId, data) => {
  await setDoc(doc(db, collectionName, documentId), data);
};

//lay du lieu tu 1 collection
export const getData = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
  return data;
};

//lay du lieu tu 1 document
export const getData2 = async (collectionName, documentName) => {
  const docRef = doc(db, collectionName, documentName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

//lay du lieu tu 1 document realtime
// export const getDataRealtime = (collectionName, documentName) => {
//   onSnapshot(doc(db, collectionName, documentName), (doc) => {
//     console.log("doc.data(): ", doc.data());
//   });
// };
