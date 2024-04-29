const userPoints = []

document.getElementById('formulario').addEventListener('submit', (e) => {
    e.preventDefault()

    let inputs = Array.from(e.target)
    inputs.pop()
    inputs.forEach(element => userPoints.push(parseInt(element.value)))
    obtainUserFeats()
})

// Tidy to auto-clean all these tensors
// tf.tidy(() => {
//     const users = ['Gant', 'Todd', 'Jed', 'Justin']
//     const bands = [
//       'Nirvana',
//       'Nine Inch Nails',
//       'Backstreet Boys',
//       'N Sync',
//       'Night Club',
//       'Apashe',
//       'STP',
//     ]
//     const features = [
//       'Grunge',
//       'Rock',
//       'Industrial',
//       'Boy Band',
//       'Dance',
//       'Techno',
//     ]

//     // User votes <4>
//     const user_votes = tf.tensor([
//       [10, 9, 1, 1, 8, 7, 8],
//       [6, 8, 2, 2, 0, 10, 0],
//       [0, 2, 10, 9, 3, 7, 0],
//       [7, 4, 2, 3, 6, 5, 5],
//     ])

//     // Music Styles <5>
//     const band_feats = tf.tensor([
//       [1, 1, 0, 0, 0, 0],
//       [1, 0, 1, 0, 0, 0],
//       [0, 0, 0, 1, 1, 0],
//       [0, 0, 0, 1, 0, 0],
//       [0, 0, 1, 0, 0, 1],
//       [0, 0, 1, 0, 0, 1],
//       [1, 1, 0, 0, 0, 0],
//     ])

//     // User's favorite styles
//     const user_feats = tf.matMul(user_votes, band_feats)
//     // Print the answers
//     user_feats.print()

//     // Let's make them pretty
//     const top_user_features = tf.topk(user_feats, features.length)
//     // Back to JavaScript
//     const top_genres = top_user_features.indices.arraySync()
//     // print the results
//     users.map((u, i) => {
//       const rankedCategories = top_genres[i].map((v) => features[v])
//       console.log(u, rankedCategories)
//     })
//   })

function obtainUserFeats () {
  tf.tidy(() => {
      const bands = [
          "Nirvana",
          "Cuarteto de Nos",
          "Soda Stereo",
          "Coldplay",
          "Ed Sheeran",
          "Fall out boys",
          "Skillet",
          "Shakira",
          "Maná",
      ]
  
      const features = [
          "Grunge",
          "Rock",
          "Punk",
          "Pop",
          "Folk",
          "Metal",
          "Alternativo",
          "Latino"
      ]
  
      const user_votes = tf.tensor2d([userPoints])
  
      const band_feats = tf.tensor2d([
          [1, 1, 1, 0, 0, 0, 0, 0],
          [0, 1, 0, 1, 1, 0, 0, 0],
          [0, 1, 0, 1, 0, 0, 1, 0],
          [0, 1, 0, 1, 0, 0, 1, 0],
          [0, 0, 0, 1, 1, 0, 0, 0],
          [0, 1, 1, 1, 0, 0, 1, 0],
          [1, 1, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 0, 0, 0, 1],
          [0, 1, 0, 1, 0, 0, 1, 1],
      ])
  
      // User's favorite styles
      const user_feats = tf.matMul(user_votes, band_feats)
      // Print the answers
      // user_feats.print()

      const top_user_features = tf.topk(user_feats, features.length)
      // console.log(top_user_features)

      const top_genres = top_user_features.indices.arraySync()
      // console.log(top_genres);

      const rankedCategories = [] 
      top_genres[0].forEach(i => rankedCategories.push(features[i]))
      console.log("Your Preferences Genres are: ", rankedCategories)

      const results = document.getElementById("result")
      results.innerHTML = "<h2>Estos son tus generos preferidos en orden</h2>"
      rankedCategories.forEach((genre, index) => results.innerHTML += "<p class='fs-3'>" + (index + 1) + ". " + genre + "</p>");
  })
}