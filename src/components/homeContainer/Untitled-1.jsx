// handleExpandClick = () => {
  //     // setExpanded(!expanded);
  //   };
  //   handleFavourite = async (event) => {
  //     const {currentUser,userPosts}=this.props
  //     const {uuid,image}=userPosts
  //     const {avatar,displayName}=currentUser
  //     // setFavourite(favourite => (!favourite))
  //     const likesDoc = firestore.collection('likes').doc(uuid)
  //     const likesSnapshot = await firestore.collection('likes').doc(uuid).get()
  //     console.log(likesSnapshot.exists)
  //     if (!likesSnapshot.exists) {
  //       likesDoc.set({
  //         userLikes: {
  //           displayName: currentUser.displayName,
  //           avatar: currentUser.avatar
  //         }
  //       })
  //     }
  //     else {
  //       likesDoc.update({
  //         userLikes: firebase.firestore.FieldValue.arrayUnion({
  //           displayName: currentUser.displayName,
  //           avatar: currentUser.avatar
  //         })
  //       })
  
  //     }
  //     if (this.state.favourite == false) {
  //       const userLikesArray = likesSnapshot.data().userLikes
  //       if (likesSnapshot.exists) {
  //         userLikesArray.map(k => {
  //           if (k.displayName == currentUser.displayName) {
  //             likesDoc.update({
  //               userLikes: firebase.firestore.FieldValue.arrayRemove(k)
  //             })
  //           }
  //         })
  //       }
  //     }
  
  
  //   }