let posters = [
  { poster: "terminator.jpg" },
  { poster: "pulpfiction.jpg" },
  { poster: "scarface.jpg" },
  { poster: "ghostbusters.jpg" },
  { poster: "goonies.jpg" },
  { poster: "terminator.jpg" },
  { poster: "pulpfiction.jpg" },
  { poster: "scarface.jpg" },
  { poster: "ghostbusters.jpg" },
  { poster: "goonies.jpg" },
]

let posters2 = [
  { poster: "terminator.jpg" },
  { poster: "pulpfiction.jpg" },
  { poster: "scarface.jpg" },
  { poster: "ghostbusters.jpg" },
  { poster: "goonies.jpg" },
  { poster: "terminator.jpg" },
  { poster: "pulpfiction.jpg" },
  { poster: "scarface.jpg" },
  { poster: "ghostbusters.jpg" },
  { poster: "goonies.jpg" },
]

let active = 0
let animating = false
const depth = 10
const itemWidth = 365
const animSpeed = 550

// javascript implementation

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".ex-carousel")

  render()

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      console.log("mutation:", mutation)
      switch (mutation.type) {
        case "childList":
          i
          break
      }
    }
  })

  observer.observe(carousel, {
    attributes: false,
    childList: true,
    subtree: false,
  })

  function render() {
    // iterate through all posters and create dom
    const l = posters.length

    posters.forEach((item, i) => {
      const zIndex = l - i
      const x = active * -itemWidth
      const z = (i - active) * -depth
      const translateX = `translateX(${x}px)`
      const translateZ = `translateZ(${z}px)`

      item.z = z
      item.x = x
      item.zIndex = zIndex

      if (!item.element) {
        const element = document.createElement("div")
        element.classList.add("ex-carousel__item")
        //element.setAttribute("tabindex", i)
        const poster = document.createElement("div")
        poster.classList.add("ex-carousel__poster")
        poster.style.backgroundImage = 'url("asset/poster/' + item.poster + '")'
        element.appendChild(poster)

        element.style.zIndex = zIndex
        element.style.transform = `${translateZ} ${translateX}`
        if (item.reshuffled) {
          //element.style.opacity = 0
          poster.style.transform = `translateX(-200px)`
        }

        item.onClick = event => onClick(item)
        element.addEventListener("click", item.onClick)
        item.element = element

        carousel.appendChild(item.element)
        if (item.reshuffled) {
          reflow()
          //element.style.opacity = 1
          poster.style.transform = `translateX(0)`
          item.reshuffled = false
        }
      } else {
        item.element.style.zIndex = zIndex
        item.element.style.transform = `${translateZ} ${translateX}`
      }
    })
  }

  function onClick(item) {
    if (animating) {
      return
    }
    animating = true
    carousel.classList.add("ex-carousel--animating")
    const index = posters.indexOf(item)
    item.element.classList.add("active")
    const shifting = posters.slice(0, index)
    const pushing = shifting.map(item => ({
      ...item,
      element: undefined,
      reshuffled: true,
    }))
    posters.push(...pushing)

    render()

    active = index
    reflow()
    render()

    setTimeout(() => {
      carousel.classList.add("ex-carousel--render")
      reflow()
      const shifting = posters.splice(0, index)
      shifting.forEach(item => carousel.removeChild(item.element))
      active = 0
      render()
      reflow()
      carousel.classList.remove("ex-carousel--animating")
      carousel.classList.remove("ex-carousel--render")
      animating = false
    }, animSpeed)
  }
})

function reflow() {
  document.body.offsetHeight
}

// css onlye

// document.addEventListener("DOMContentLoaded", () => {
//   const carousel = document.querySelector(".ex-carousel-css")

//   // Create an observer instance linked to the callback function
//   const observer = new MutationObserver((mutationsList, observer) => {
//     for (const mutation of mutationsList) {
//       console.log("mutation:", mutation)
//     }
//   })

//   observer.observe(carousel, {
//     attributes: false,
//     childList: true,
//     subtree: false,
//   })

//   render()

//   function render() {
//     // iterate through all posters and create dom
//     const l = posters2.length

//     posters2.forEach((item, i) => {
//       const element = document.createElement("div")
//       element.classList.add("ex-carousel-css__item")
//       //element.setAttribute("tabindex", i)
//       const poster = document.createElement("div")
//       poster.classList.add("ex-carousel-css__poster")
//       poster.style.backgroundImage = 'url("asset/poster/' + item.poster + '")'
//       element.appendChild(poster)

//       item.onClick = event => onClick(item)
//       element.addEventListener("click", item.onClick)
//       item.element = element

//       carousel.appendChild(item.element)
//     })
//   }

//   function onClick(item) {
//     const index = posters2.indexOf(item)
//     console.log("onClick", index, item.element)
//     const shifting = posters2.splice(0, index)
//     posters2.push(...shifting)
//     shifting.forEach(item => carousel.appendChild(item.element))
//     //shifting.forEach(item => carousel.removeChild(item.element))
//   }
// })
