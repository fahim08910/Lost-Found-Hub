import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  runTransaction,
  orderBy,
  limit,
} from "firebase/firestore";
import { storage } from "../firebase/config"; // Import storage
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase/config";

export const addReportPost = async (postData, pictures, reportType) => {
  const randomFolderName = `folder_${Date.now()}_${Math.floor(
    Math.random() * 1000
  )}`;
  try {
    const r_user = collection(db, "users");
    const q_user = query(
      r_user,
      where("userName", "==", postData.reportedUserName)
    );
    const userCheck = await getDocs(q_user);
    if (userCheck.empty) {
      throw new Error("User does not exist");
    }

    const postsReff = collection(db, "report-post");
    const q1 = query(
      postsReff,
      where("reportedUserName", "==", postData.reportedUserName)
    );
    const duplicateSnapshot = await getDocs(q1);
    if (!duplicateSnapshot.empty) {
      const postsReff = collection(db, "report-post");
      const q1 = query(postsReff, where("userName", "==", postData.userName));
      const d_check = await getDocs(q1);

      if (!d_check.empty) {
        throw new Error("User Already Reported.");
      }
    }

    if (reportType == "Post") {
      if (postData.postType === "Lost Post") {
        const postsRefS = collection(db, "lost-post");
        console.log(postData.postId);
        const qq = query(
          postsRefS,
          where("postNumber", "==", Number(postData.postId))
        );
        const duplicateSnapshotq = await getDocs(qq);
        if (duplicateSnapshotq.empty) {
          throw new Error("Invalid Post Id");
        }
      } else {
        const postsRefS = collection(db, "found-post");
        const qq = query(
          postsRefS,
          where("postNumber", "==", Number(postData.postId))
        );
        const duplicateSnapshotq = await getDocs(qq);
        if (duplicateSnapshotq.empty) {
          throw new Error("Invalid Post Id");
        }
      }
    }

    const uploadedPictureURLs = await Promise.all(
      pictures.map(async (picture) => {
        const pictureRef = ref(
          storage,
          `report-posts/${randomFolderName}/${picture.name}`
        );
        await uploadBytes(pictureRef, picture);
        return getDownloadURL(pictureRef);
      })
    );

    await runTransaction(db, async (transaction) => {
      const postsRef = collection(db, "report-post");

      await addDoc(postsRef, {
        ...postData,
        pictures: uploadedPictureURLs, // Add pictures' URLs
        imgPath: `report-posts/${randomFolderName}/`,
        // postNumber: nextPostNumber,
        reportType : reportType,
        postTime: serverTimestamp(),
        reportStatus: "Submitted",
      });
    });

    return { success: true, message: "Post added successfully." };
  } catch (error) {
    console.error("Error adding lost post: ", error);
    return { success: false, message: `Error adding post: ${error.message}` };
  }
};
