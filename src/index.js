import Vue from "vue"
import app from "./app"
import carousel from "./component/carousel"
import jsx from "./component/jsx-component"
import sfc from "./component/single-file-component"
import slc from "./component/string-literal-component"
import "./index.scss"

// string literal component
Vue.component("my-string-literal-component", slc)

// single file component example
Vue.component("my-single-file-component", sfc)

// jsx based vue component
Vue.component("my-jsx-component", jsx)

// carousel
Vue.component("carousel", carousel)

// initialize vue app
new Vue(app)

// document.addEventListener("DOMContentLoaded", () => {
//   const carousel = document.querySelector(".my-carousel")

//   const content = [
//     { image: "asset/poster/terminator.jpg", data: "terminator" },
//     { image: "asset/poster/pulpfiction.jpg", data: "pulpfiction" },
//     { image: "asset/poster/scarface.jpg", data: "scarface" },
//     { image: "asset/poster/ghostbusters.jpg", data: "ghostbusters" },
//     { image: "asset/poster/goonies.jpg", data: "goonies" },
//     { image: "asset/poster/terminator.jpg", data: "terminator" },
//     { image: "asset/poster/pulpfiction.jpg", data: "pulpfiction" },
//     { image: "asset/poster/scarface.jpg", data: "scarface" },
//     { image: "asset/poster/ghostbusters.jpg", data: "ghostbusters" },
//     { image: "asset/poster/goonies.jpg", data: "goonies" },
//   ].map(item => {
//     const element = document.createElement("div")
//     element.style.backgroundImage = `url("${item.image}")`
//     return {
//       element,
//       data: item.data,
//     }
//   })

//   new Carousel({
//     carousel,
//     content,
//     contentHeight: 550,
//     contentWidth: 365,
//     onSelect: selected => {
//       console.log("onSelect", selected)
//     },
//   })
// })
