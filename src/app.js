export default {
  el: "#app",

  methods: {
    onSelectCarousel(selected) {
      console.log("onSelectCarousel", selected)
    },
  },

  data: {
    name: "Vue App Started",

    carousel1: [
      { image: "asset/poster/terminator.jpg", name: "terminator" },
      { image: "asset/poster/pulpfiction.jpg", name: "pulpfiction" },
      { image: "asset/poster/scarface.jpg", name: "scarface" },
      { image: "asset/poster/ghostbusters.jpg", name: "ghostbusters" },
      { image: "asset/poster/goonies.jpg", name: "goonies" },
      { image: "asset/poster/terminator.jpg", name: "terminator" },
      { image: "asset/poster/pulpfiction.jpg", name: "pulpfiction" },
      { image: "asset/poster/scarface.jpg", name: "scarface" },
      { image: "asset/poster/ghostbusters.jpg", name: "ghostbusters" },
      { image: "asset/poster/goonies.jpg", name: "goonies" },
    ],
  },
}
